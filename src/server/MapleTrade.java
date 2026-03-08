package server;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;
import client.inventory.InventoryException;
import client.inventory.Item;
import client.inventory.ItemFlag;
import constants.GameConstants;
import client.MapleCharacter;
import client.MapleClient;
import client.inventory.MapleInventoryType;
import client.messages.CommandProcessor;
import constants.ServerConstants.CommandType;
import handling.world.World;
import java.lang.ref.WeakReference;
import java.util.concurrent.atomic.AtomicBoolean;
import tools.FileoutputUtil;
import tools.packet.CField;
import tools.packet.CField.InteractionPacket;
import tools.packet.CWvsContext;
import tools.packet.PlayerShopPacket;

public class MapleTrade {

    private MapleTrade partner = null;
    private final List<Item> items = new LinkedList<>();
    private List<Item> exchangeItems;
    private int meso = 0, exchangeMeso = 0;
    // AtomicBoolean: prevents dupe via concurrent lock() calls
    private final AtomicBoolean locked = new AtomicBoolean(false);
    private boolean inTrade = false;
    private final WeakReference<MapleCharacter> chr;
    private final byte tradingslot;
    // Flag: prevents inventory moves while trade is completing
    private volatile boolean completing = false;

    public MapleTrade(final byte tradingslot, final MapleCharacter chr) {
        this.tradingslot = tradingslot;
        this.chr = new WeakReference<MapleCharacter>(chr);
    }

    public final void CompleteTrade() {
        if (exchangeItems != null) {
            final MapleCharacter c = chr.get();
            if (c == null) return;
            
            final List<Item> itemz = new LinkedList<>(exchangeItems);
            final List<Short> addedSlots = new ArrayList<>();
            
            try {
                for (final Item item : itemz) {
                    short flag = item.getFlag();
                    if (ItemFlag.KARMA_EQ.check(flag)) {
                        item.setFlag((short) (flag - ItemFlag.KARMA_EQ.getValue()));
                    } else if (ItemFlag.KARMA_USE.check(flag)) {
                        item.setFlag((short) (flag - ItemFlag.KARMA_USE.getValue()));
                    }
                    // Attempt to add. If this fails, it will throw an exception caught below.
                    if (!MapleInventoryManipulator.addFromDrop(c.getClient(), item, false)) {
                        throw new InventoryException("Failed to add item during trade: " + item.getItemId());
                    }
                }
                exchangeItems.clear();
            } catch (Exception e) {
                // Rollback would normally go here if we didn't have AtomicTransaction logic in completeTrade static method.
                // In Apex, we rely on the parent lock to handle the revert.
                FileoutputUtil.log(FileoutputUtil.PacketEx_Log, "CompleteTrade error for " + c.getName() + ": " + e.getMessage());
                throw e; // Rethrow to trigger parent rollback
            }
        }
        if (exchangeMeso > 0) {
            chr.get().gainMeso(exchangeMeso - GameConstants.getTaxAmount(exchangeMeso), false, false);
        }
        exchangeMeso = 0;
        completing = false;
        if (chr.get() != null) {
            chr.get().getClient().getSession().write(InteractionPacket.TradeMessage(tradingslot, (byte) 0x07));
        }
    }

    public final void cancel(final MapleClient c, final MapleCharacter chr) {
        cancel(c, chr, 0);
    }

    public final void cancel(final MapleClient c, final MapleCharacter chr, final int unsuccessful) {
        if (items != null) { // Just to be on the safe side...
	    List<Item> itemz = new LinkedList<Item>(items);
            for (final Item item : itemz) {
                MapleInventoryManipulator.addFromDrop(c, item, false);
            }
            items.clear();
        }
        if (meso > 0) {
            chr.gainMeso(meso, false, false);
        }
        meso = 0;


        c.getSession().write(InteractionPacket.getTradeCancel(tradingslot, unsuccessful));
    }

    public final boolean isLocked() {
        return locked.get();
    }

    public final void setMeso(final int meso) {
        if (isLocked() || partner == null || meso <= 0 || this.meso + meso <= 0) {
            return;
        }
        if (chr.get().getMeso() >= meso) {
            chr.get().gainMeso(-meso, false, false);
            this.meso += meso;
            chr.get().getClient().getSession().write(InteractionPacket.getTradeMesoSet((byte) 0, this.meso));
            if (partner != null) {
                partner.getChr().getClient().getSession().write(InteractionPacket.getTradeMesoSet((byte) 1, this.meso));
            }
        }
    }

    public final void addItem(final Item item) {
        if (isLocked() || partner == null) {
            return;
        }
        items.add(item);
        chr.get().getClient().getSession().write(InteractionPacket.getTradeItemAdd((byte) 0, item));
        if (partner != null) {
            partner.getChr().getClient().getSession().write(InteractionPacket.getTradeItemAdd((byte) 1, item));
        }
    }

    public final void chat(final String message) throws Exception {
         if (!CommandProcessor.processCommand(chr.get().getClient(), message, CommandType.TRADE)) {
            chr.get().dropMessage(-2, chr.get().getName() + " : " + message);
            if (partner != null) {
                partner.getChr().getClient().getSession().write(PlayerShopPacket.shopChat(chr.get().getName() + " : " + message, 1));
            }
        }
        if (chr.get().getClient().isMonitored()) { // Broadcast info even if it was a command.
            World.Broadcast.broadcastGMMessage(CWvsContext.serverNotice(6, chr.get().getName() + " said in Trade with " + partner.getChr().getName() + ": " + message));
        } else if (partner != null && partner.getChr() != null && partner.getChr().getClient().isMonitored()) {
            World.Broadcast.broadcastGMMessage(CWvsContext.serverNotice(6, chr.get().getName() + " said in Trade with " + partner.getChr().getName() + ": " + message));
        }
    }


    public final void chatAuto(final String message) {
        chr.get().dropMessage(-2, message);
        if (partner != null) {
            partner.getChr().getClient().getSession().write(PlayerShopPacket.shopChat(message, 1));
        }
        if (chr.get().getClient().isMonitored()) { // Broadcast info even if it was a command.
            World.Broadcast.broadcastGMMessage(CWvsContext.serverNotice(6, chr.get().getName() + " said in Trade [Automated] with " + partner.getChr().getName() + ": " + message));
        } else if (partner != null && partner.getChr() != null && partner.getChr().getClient().isMonitored()) {
            World.Broadcast.broadcastGMMessage(CWvsContext.serverNotice(6, chr.get().getName() + " said in Trade [Automated] with " + partner.getChr().getName() + ": " + message));
        }
    }

    public final MapleTrade getPartner() {
        return partner;
    }

    public final void setPartner(final MapleTrade partner) {
        if (isLocked()) {
            return;
        }
        this.partner = partner;
    }

    public final MapleCharacter getChr() {
        return chr.get();
    }

    public final int getNextTargetSlot() {
        if (items.size() >= 9) {
            return -1;
        }
        int ret = 1; //first slot
        for (Item item : items) {
            if (item.getPosition() == ret) {
                ret++;
            }
        }
        return ret;
    }

    public boolean inTrade() {
	return inTrade;
    }

    public final boolean setItems(final MapleClient c, final Item item, byte targetSlot, final int quantity) {
        int target = getNextTargetSlot();
        final MapleItemInformationProvider ii = MapleItemInformationProvider.getInstance();
        // ANTI-DUPE: Block item movement if trade is completing or locked
        if (completing || isLocked()) {
            FileoutputUtil.log(FileoutputUtil.Hacker_Log,
                "[Trade-AntidDupe] " + (chr.get() != null ? chr.get().getName() : "Unknown") +
                " tried to move items during a locked/completing trade!");
            c.getSession().write(CWvsContext.enableActions());
            return false;
        }
        if (partner == null || target == -1 || GameConstants.isPet(item.getItemId()) || isLocked() || (GameConstants.getInventoryType(item.getItemId()) == MapleInventoryType.EQUIP && quantity != 1)) {
            return false;
        }
        final short flag = item.getFlag();
        if (ItemFlag.UNTRADEABLE.check(flag) || ItemFlag.LOCK.check(flag)) {
            c.getSession().write(CWvsContext.enableActions());
            return false;
        }
        if (ii.isDropRestricted(item.getItemId()) || ii.isAccountShared(item.getItemId())) {
            if (!(ItemFlag.KARMA_EQ.check(flag) || ItemFlag.KARMA_USE.check(flag))) {
                c.getSession().write(CWvsContext.enableActions());
                return false;
            }
        }
        Item tradeItem = item.copy();
        if (GameConstants.isThrowingStar(item.getItemId()) || GameConstants.isBullet(item.getItemId())) {
            tradeItem.setQuantity(item.getQuantity());
            MapleInventoryManipulator.removeFromSlot(c, GameConstants.getInventoryType(item.getItemId()), item.getPosition(), item.getQuantity(), true);
        } else {
            tradeItem.setQuantity((short) quantity);
            MapleInventoryManipulator.removeFromSlot(c, GameConstants.getInventoryType(item.getItemId()), item.getPosition(), (short) quantity, true);
        }
        if (targetSlot < 0) {
            targetSlot = (byte) target;
        } else {
            for (Item itemz : items) {
                if (itemz.getPosition() == targetSlot) {
                    targetSlot = (byte) target;
                    break;
                }
            }
        }
        tradeItem.setPosition(targetSlot);
        addItem(tradeItem);
        return true;
    }

    private final int check() { // 0 = fine, 1 = invent space not, 2 = pickupRestricted
        if (chr.get().getMeso() + exchangeMeso < 0) {
            return 1;
        }

	if (exchangeItems != null) {
            final MapleItemInformationProvider ii = MapleItemInformationProvider.getInstance();
            byte eq = 0, use = 0, setup = 0, etc = 0, cash = 0;
            for (final Item item : exchangeItems) {
            	switch (GameConstants.getInventoryType(item.getItemId())) {
                    case EQUIP:
                    	eq++;
                    	break;
                    case USE:
                    	use++;
                    	break;
                    case SETUP:
                    	setup++;
                    	break;
                    case ETC:
                    	etc++;
                    	break;
                    case CASH: // Not allowed, probably hacking
                   	cash++;
                  	break;
            	}
            	if (ii.isPickupRestricted(item.getItemId()) && chr.get().haveItem(item.getItemId(), 1, true, true)) {
                    return 2;
            	}
            }
            if (chr.get().getInventory(MapleInventoryType.EQUIP).getNumFreeSlot() < eq || chr.get().getInventory(MapleInventoryType.USE).getNumFreeSlot() < use || chr.get().getInventory(MapleInventoryType.SETUP).getNumFreeSlot() < setup || chr.get().getInventory(MapleInventoryType.ETC).getNumFreeSlot() < etc || chr.get().getInventory(MapleInventoryType.CASH).getNumFreeSlot() < cash) {
                return 1;
            }
	}

        return 0;
    }

    public final static void completeTrade(final MapleCharacter c) {
        final MapleTrade local = c.getTrade();
        final MapleTrade partner = (local != null) ? local.getPartner() : null;

        if (local == null || partner == null || local.isLocked()) {
            return;
        }

        // 1. Lock the local side first
        if (!local.locked.compareAndSet(false, true)) {
            return;
        }
        
        partner.getChr().getClient().getSession().write(InteractionPacket.getTradeConfirmation());
        partner.exchangeItems = new LinkedList<>(local.items);
        partner.exchangeMeso = local.meso;

        if (partner.isLocked()) {
            final MapleCharacter pChr = partner.getChr();
            
            // 2. Deadlock Prevention: Order locks by Character ID
            final MapleCharacter firstLock = c.getId() < pChr.getId() ? c : pChr;
            final MapleCharacter secondLock = c.getId() < pChr.getId() ? pChr : c;

            // 3. Begin Atomic Transaction
            firstLock.getInventoryLock().lock();
            try {
                secondLock.getInventoryLock().lock();
                try {
                    local.completing = true;
                    partner.completing = true;

                    // Final distance & status check
                    if (c.getMapId() != pChr.getMapId()) {
                        cancelTrade(local, c.getClient(), c);
                        return;
                    }

                    int lz = local.check(), lz2 = partner.check();
                    if (lz == 0 && lz2 == 0) {
                        try {
                            // Perform Atomic Exchange
                            local.CompleteTrade();
                            partner.CompleteTrade();
                            
                            pChr.setTrade(null);
                            c.setTrade(null);
                            
                            FileoutputUtil.log(FileoutputUtil.Trade_Log, "[Trade] Success: " + c.getName() + " <-> " + pChr.getName());
                        } catch (Exception e) {
                            // 4. Atomic Rollback: If anything fails during the exchange, cancel both
                            FileoutputUtil.log(FileoutputUtil.Trade_Log, "[Trade-Error] Rollback triggered during exchange: " + e.getMessage());
                            cancelTrade(local, c.getClient(), c);
                        }
                    } else {
                        // Inventory Check Failed
                        local.completing = false;
                        partner.completing = false;
                        partner.cancel(pChr.getClient(), pChr, lz == 0 ? lz2 : lz);
                        local.cancel(c.getClient(), c, lz == 0 ? lz2 : lz);
                        pChr.setTrade(null);
                        c.setTrade(null);
                    }
                } finally {
                    secondLock.getInventoryLock().unlock();
                }
            } finally {
                firstLock.getInventoryLock().unlock();
            }
        }
    }

    public static final void cancelTrade(final MapleTrade localTrade, final MapleClient c, final MapleCharacter chr) {
        localTrade.cancel(c, chr);

        final MapleTrade partner = localTrade.getPartner();
        if (partner != null && partner.getChr() != null) {
            partner.cancel(partner.getChr().getClient(), partner.getChr());
            partner.getChr().setTrade(null);
        }
        chr.setTrade(null);
    }

    public static final void startTrade(final MapleCharacter c) {
        if (c.getTrade() == null) {
            c.setTrade(new MapleTrade((byte) 0, c));
            c.getClient().getSession().write(InteractionPacket.getTradeStart(c.getClient(), c.getTrade(), (byte) 0));
        } else {
            c.getClient().getSession().write(CWvsContext.serverNotice(5, "You are already in a trade"));
        }
    }

    public static final void inviteTrade(final MapleCharacter c1, final MapleCharacter c2) {
	if (c1 == null || c1.getTrade() == null) {
	    return;
	}
        if (c2 != null && c2.getTrade() == null) {
            c2.setTrade(new MapleTrade((byte) 1, c2));
            c2.getTrade().setPartner(c1.getTrade());
            c1.getTrade().setPartner(c2.getTrade());
            c2.getClient().getSession().write(InteractionPacket.getTradeInvite(c1));
        } else {
            c1.getClient().getSession().write(CWvsContext.serverNotice(5, "The other player is currently trading with someone else."));
            cancelTrade(c1.getTrade(), c1.getClient(), c1);
        }
    }

    public static final void visitTrade(final MapleCharacter c1, final MapleCharacter c2) {
        if (c2 != null && c1.getTrade() != null && c1.getTrade().getPartner() == c2.getTrade() && c2.getTrade() != null && c2.getTrade().getPartner() == c1.getTrade()) {
            // We don't need to check for map here as the user is found via MapleMap.getCharacterById()
	    c1.getTrade().inTrade = true;
            c2.getClient().getSession().write(PlayerShopPacket.shopVisitorAdd(c1, 1));
            c1.getClient().getSession().write(InteractionPacket.getTradeStart(c1.getClient(), c1.getTrade(), (byte) 1));
            c1.dropMessage(-2, "System : Use @tradehelp to see the list of trading commands");
            c2.dropMessage(-2, "System : Use @tradehelp to see the list of trading commands");
        } else {
            c1.getClient().getSession().write(CWvsContext.serverNotice(5, "The other player has already closed the trade"));
        }
    }

    public static final void declineTrade(final MapleCharacter c) {
        final MapleTrade trade = c.getTrade();
        if (trade != null) {
            if (trade.getPartner() != null) {
                MapleCharacter other = trade.getPartner().getChr();
		if (other != null && other.getTrade() != null) {
                    other.getTrade().cancel(other.getClient(), other);
                    other.setTrade(null);
                    other.dropMessage(5, c.getName() + " has declined your trade request");
		}
            }
            trade.cancel(c.getClient(), c);
            c.setTrade(null);
        }
    }
}