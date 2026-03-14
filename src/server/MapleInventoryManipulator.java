package server;

import client.MapleBuffStat;
import client.MapleCharacter;
import client.MapleClient;
import client.MapleQuestStatus;
import client.MapleTrait.MapleTraitType;
import client.PlayerStats;
import client.inventory.*;
import constants.GameConstants;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Iterator;
import client.Skill;
import client.SkillEntry;
import client.SkillFactory;
import server.quest.MapleQuest;
import scripting.EventManager;
import tools.FileoutputUtil;
import tools.packet.CWvsContext;
import tools.packet.CWvsContext.InfoPacket;
import tools.packet.CWvsContext.InventoryPacket;
import tools.packet.MTSCSPacket;

public class MapleInventoryManipulator {

    public static void addRing(MapleCharacter chr, int itemId, int ringId, int sn, String partner) {
        CashItemInfo csi = CashItemFactory.getInstance().getItem(sn);
        if (csi == null) {
            return;
        }
        Item ring = chr.getCashInventory().toItem(csi, ringId);
        if (ring == null || ring.getUniqueId() != ringId || ring.getUniqueId() <= 0 || ring.getItemId() != itemId) {
            return;
        }
        chr.getCashInventory().addToInventory(ring);
        chr.getClient().getSession().write(MTSCSPacket.sendBoughtRings(GameConstants.isCrushRing(itemId), ring, sn,
                chr.getClient().getAccID(), partner));
    }

    public static boolean addbyItem(final MapleClient c, final Item item) {
        return addbyItem(c, item, false) >= 0;
    }

    public static short addbyItem(final MapleClient c, final Item item, final boolean fromcs) {
        c.getPlayer().getInventoryLock().lock();
        try {
            final MapleInventoryType type = GameConstants.getInventoryType(item.getItemId());
            final short newSlot = c.getPlayer().getInventory(type).addItem(item);
            if (newSlot == -1) {
                if (!fromcs) {
                    c.sendPacket(InventoryPacket.getInventoryFull());
                    c.sendPacket(InventoryPacket.getShowInventoryFull());
                }
                return newSlot;
            }
            if (GameConstants.isHarvesting(item.getItemId())) {
                c.getPlayer().getStat().handleProfessionTool(c.getPlayer());
            }
            c.sendPacket(InventoryPacket.addInventorySlot(type, item));
            c.getPlayer().havePartyQuest(item.getItemId());
            return newSlot;
        } catch (Exception e) {
            c.sendPacket(CWvsContext.enableActions());
            e.printStackTrace();
            return -1;
        } finally {
            c.getPlayer().getInventoryLock().unlock();
        }
    }

    public static int getUniqueId(int itemId, MaplePet pet) {
        int uniqueid = -1;
        if (GameConstants.isPet(itemId)) {
            if (pet != null) {
                uniqueid = pet.getUniqueId();
            } else {
                uniqueid = MapleInventoryIdentifier.getInstance();
            }
        } else if (GameConstants.getInventoryType(itemId) == MapleInventoryType.CASH
                || MapleItemInformationProvider.getInstance().isCash(itemId)) { // less work to do
            uniqueid = MapleInventoryIdentifier.getInstance(); // Shouldn't be generated yet, so put it here
        }
        return uniqueid;
    }

    public static boolean addById(MapleClient c, int itemId, short quantity, String gmLog) {
        return addById(c, itemId, quantity, null, null, 0, gmLog);
    }

    public static boolean addById(MapleClient c, int itemId, short quantity, String owner, String gmLog) {
        return addById(c, itemId, quantity, owner, null, 0, gmLog);
    }

    public static byte addId(MapleClient c, int itemId, short quantity, String owner, String gmLog) {
        return addId(c, itemId, quantity, owner, null, 0, gmLog);
    }

    public static boolean addById(MapleClient c, int itemId, short quantity, String owner, MaplePet pet, String gmLog) {
        return addById(c, itemId, quantity, owner, pet, 0, gmLog);
    }

    public static boolean addById(MapleClient c, int itemId, short quantity, String owner, MaplePet pet, long period,
            String gmLog) {
        return addId(c, itemId, quantity, owner, pet, period, gmLog) >= 0;
    }

    public static byte addId(MapleClient c, int itemId, short quantity, String owner, MaplePet pet, long period,
            String gmLog) {
        final MapleItemInformationProvider ii = MapleItemInformationProvider.getInstance();
        if ((ii.isPickupRestricted(itemId) && c.getPlayer().haveItem(itemId, 1, true, false))
                || (!ii.itemExists(itemId))) {
            c.sendPacket(InventoryPacket.getInventoryFull());
            c.sendPacket(InventoryPacket.showItemUnavailable());
            return -1;
        }
        final MapleInventoryType type = GameConstants.getInventoryType(itemId);
        int uniqueid = getUniqueId(itemId, pet);
        short newSlot = -1;
        if (!type.equals(MapleInventoryType.EQUIP)) {
            final short slotMax = ii.getSlotMax(itemId);
            final List<Item> existing = c.getPlayer().getInventory(type).listById(itemId);
            if (!GameConstants.isRechargable(itemId)) {
                if (existing.size() > 0) { // First update all existing slots to slotMax
                    Iterator<Item> i = existing.iterator();
                    while (quantity > 0) {
                        if (i.hasNext()) {
                            Item eItem = (Item) i.next();
                            short oldQ = eItem.getQuantity();
                            if (oldQ < slotMax && (eItem.getOwner().equals(owner) || owner == null)
                                    && eItem.getExpiration() == -1) {
                                short newQ = (short) Math.min(oldQ + quantity, slotMax);
                                quantity -= (newQ - oldQ);
                                eItem.setQuantity(newQ);
                                c.sendPacket(InventoryPacket.updateInventorySlot(type, eItem, false));
                            }
                        } else {
                            break;
                        }
                    }
                }
                Item nItem;
                // Add new slots if there is still something left
                while (quantity > 0) {
                    short newQ = (short) Math.min(quantity, slotMax);
                    if (newQ != 0) {
                        quantity -= newQ;
                        nItem = new Item(itemId, (byte) 0, newQ, (byte) 0, uniqueid);
                        newSlot = c.getPlayer().getInventory(type).addItem(nItem);
                        if (newSlot == -1) {
                            c.sendPacket(InventoryPacket.getInventoryFull());
                            c.sendPacket(InventoryPacket.getShowInventoryFull());
                            return -1;
                        }
                        if (gmLog != null) {
                            nItem.setGMLog(gmLog);
                        }
                        if (owner != null) {
                            nItem.setOwner(owner);
                        }
                        if (period > 0) {
                            nItem.setExpiration(System.currentTimeMillis() + (period * 24 * 60 * 60 * 1000));
                        }
                        if (pet != null) {
                            nItem.setPet(pet);
                            pet.setInventoryPosition(newSlot);
                            c.getPlayer().addPet(pet);
                        }
                        c.sendPacket(InventoryPacket.addInventorySlot(type, nItem));
                        if (GameConstants.isRechargable(itemId) && quantity == 0) {
                            break;
                        }
                    } else {
                        c.getPlayer().havePartyQuest(itemId);
                        c.sendPacket(CWvsContext.enableActions());
                        return (byte) newSlot;
                    }
                }
            } else {
                // Throwing Stars and Bullets - Add all into one slot regardless of quantity.
                final Item nItem = new Item(itemId, (byte) 0, quantity, (byte) 0, uniqueid);
                newSlot = c.getPlayer().getInventory(type).addItem(nItem);

                if (newSlot == -1) {
                    c.sendPacket(InventoryPacket.getInventoryFull());
                    c.sendPacket(InventoryPacket.getShowInventoryFull());
                    return -1;
                }
                if (period > 0) {
                    nItem.setExpiration(System.currentTimeMillis() + (period * 24 * 60 * 60 * 1000));
                }
                if (gmLog != null) {
                    nItem.setGMLog(gmLog);
                }
                c.sendPacket(InventoryPacket.addInventorySlot(type, nItem));
                c.sendPacket(CWvsContext.enableActions());
            }
        } else {
            if (quantity == 1) {
                final Item nEquip = ii.getEquipById(itemId, uniqueid);
                if (owner != null) {
                    nEquip.setOwner(owner);
                }
                if (gmLog != null) {
                    nEquip.setGMLog(gmLog);
                }
                if (period > 0) {
                    nEquip.setExpiration(System.currentTimeMillis() + (period * 24 * 60 * 60 * 1000));
                }
                newSlot = c.getPlayer().getInventory(type).addItem(nEquip);
                if (newSlot == -1) {
                    c.sendPacket(InventoryPacket.getInventoryFull());
                    c.sendPacket(InventoryPacket.getShowInventoryFull());
                    return -1;
                }
                c.sendPacket(InventoryPacket.addInventorySlot(type, nEquip));
                if (GameConstants.isHarvesting(itemId)) {
                    c.getPlayer().getStat().handleProfessionTool(c.getPlayer());
                }
            } else {
                throw new InventoryException("Trying to create equip with non-one quantity");
            }
        }
        c.getPlayer().havePartyQuest(itemId);
        server.LiveGuardEngine.getInstance().markDirty(c.getPlayer(), server.LiveGuardEngine.SaveType.ITEM_TRANSACTION, null);
        if (c.getPlayer() != null) {
            c.getPlayer().saveToDB(false, false);
        }
        return (byte) newSlot;
    }

    public static byte replaceEquip(MapleClient c, int itemId, short slot, short quantity, String owner, MaplePet pet,
            long period, String gmLog) {
        final MapleItemInformationProvider ii = MapleItemInformationProvider.getInstance();
        if ((ii.isPickupRestricted(itemId) && c.getPlayer().haveItem(itemId, 1, true, false))
                || (!ii.itemExists(itemId))) {
            c.sendPacket(InventoryPacket.getInventoryFull());
            c.sendPacket(InventoryPacket.showItemUnavailable());
            return -1;
        }
        final MapleInventoryType type = MapleInventoryType.EQUIPPED;
        int uniqueid = getUniqueId(itemId, pet);
        short newSlot = -1;
        if (quantity == 1) {
            final Item nEquip = ii.getEquipById(itemId, uniqueid);
            if (owner != null) {
                nEquip.setOwner(owner);
            }
            if (gmLog != null) {
                nEquip.setGMLog(gmLog);
            }
            if (period > 0) {
                nEquip.setExpiration(System.currentTimeMillis() + (period * 24 * 60 * 60 * 1000));
            }
            newSlot = c.getPlayer().getInventory(type).replaceItem(nEquip, slot);
            if (newSlot == -1) {
                c.sendPacket(InventoryPacket.getInventoryFull());
                c.sendPacket(InventoryPacket.getShowInventoryFull());
                return -1;
            }
            c.sendPacket(InventoryPacket.addInventorySlot(type, nEquip));
            if (GameConstants.isHarvesting(itemId)) {
                c.getPlayer().getStat().handleProfessionTool(c.getPlayer());
            }
        } else {
            throw new InventoryException("Trying to replace equip with non-one quantity");
        }
        c.getPlayer().havePartyQuest(itemId);
        return (byte) newSlot;
    }

    public static Item addbyId_Gachapon(final MapleClient c, final int itemId, short quantity) {
        if (c.getPlayer().getInventory(MapleInventoryType.EQUIP).getNextFreeSlot() == -1
                || c.getPlayer().getInventory(MapleInventoryType.USE).getNextFreeSlot() == -1
                || c.getPlayer().getInventory(MapleInventoryType.ETC).getNextFreeSlot() == -1
                || c.getPlayer().getInventory(MapleInventoryType.SETUP).getNextFreeSlot() == -1) {
            return null;
        }
        final MapleItemInformationProvider ii = MapleItemInformationProvider.getInstance();
        if ((ii.isPickupRestricted(itemId) && c.getPlayer().haveItem(itemId, 1, true, false))
                || (!ii.itemExists(itemId))) {
            c.sendPacket(InventoryPacket.getInventoryFull());
            c.sendPacket(InventoryPacket.showItemUnavailable());
            return null;
        }
        final MapleInventoryType type = GameConstants.getInventoryType(itemId);

        if (!type.equals(MapleInventoryType.EQUIP)) {
            short slotMax = ii.getSlotMax(itemId);
            final List<Item> existing = c.getPlayer().getInventory(type).listById(itemId);

            if (!GameConstants.isRechargable(itemId)) {
                Item nItem = null;
                boolean recieved = false;

                if (existing.size() > 0) { // First update all existing slots to slotMax
                    Iterator<Item> i = existing.iterator();
                    while (quantity > 0) {
                        if (i.hasNext()) {
                            nItem = (Item) i.next();
                            short oldQ = nItem.getQuantity();

                            if (oldQ < slotMax) {
                                recieved = true;

                                short newQ = (short) Math.min(oldQ + quantity, slotMax);
                                quantity -= (newQ - oldQ);
                                nItem.setQuantity(newQ);
                                c.sendPacket(InventoryPacket.updateInventorySlot(type, nItem, false));
                            }
                        } else {
                            break;
                        }
                    }
                }
                // Add new slots if there is still something left
                while (quantity > 0) {
                    short newQ = (short) Math.min(quantity, slotMax);
                    if (newQ != 0) {
                        quantity -= newQ;
                        nItem = new Item(itemId, (byte) 0, newQ, (byte) 0);
                        final short newSlot = c.getPlayer().getInventory(type).addItem(nItem);
                        if (newSlot == -1 && recieved) {
                            return nItem;
                        } else if (newSlot == -1) {
                            return null;
                        }
                        recieved = true;
                        c.sendPacket(InventoryPacket.addInventorySlot(type, nItem));
                        if (GameConstants.isRechargable(itemId) && quantity == 0) {
                            break;
                        }
                    } else {
                        break;
                    }
                }
                if (recieved) {
                    c.getPlayer().havePartyQuest(nItem.getItemId());
                    return nItem;
                }
            } else {
                // Throwing Stars and Bullets - Add all into one slot regardless of quantity.
                final Item nItem = new Item(itemId, (byte) 0, quantity, (byte) 0);
                final short newSlot = c.getPlayer().getInventory(type).addItem(nItem);

                if (newSlot == -1) {
                    return null;
                }
                c.sendPacket(InventoryPacket.addInventorySlot(type, nItem));
                c.getPlayer().havePartyQuest(nItem.getItemId());
                return nItem;
            }
        } else {
            if (quantity == 1) {
                final Item item = ii.randomizeStats((Equip) ii.getEquipById(itemId));
                final short newSlot = c.getPlayer().getInventory(type).addItem(item);

                if (newSlot == -1) {
                    return null;
                }
                c.sendPacket(InventoryPacket.addInventorySlot(type, item, true));
                c.getPlayer().havePartyQuest(item.getItemId());
                return item;
            } else {
                throw new InventoryException("Trying to create equip with non-one quantity");
            }
        }
        return null;
    }

    private static boolean handleLudiPQDrop(final MapleClient c, final Item item) {
        final EventManager LudiPQ = c.getChannelServer().getEventSM().getEventManager("LudiPQ");
        if (item.getItemId() == 4001022 && LudiPQ != null && c.getPlayer().getEventInstance() != null && c.getPlayer().getEventInstance().getProperty("drop") == null) {
            String count = c.getPlayer().getEventInstance().getProperty("count");
            int currentCount = count == null ? 0 : Integer.parseInt(count);
            currentCount++;
            c.getPlayer().getEventInstance().setProperty("count", String.valueOf(currentCount));

            c.getPlayer().getMap().broadcastMessage(tools.packet.CWvsContext.getTopMsg("You have collected " + currentCount + " Passes."));

            if (currentCount >= 20) {
                c.getPlayer().getMap().broadcastMessage(tools.packet.CWvsContext.getTopMsg("A portal to the next stage has opened."));
                c.getPlayer().getMap().startMapEffect("All of the passes have been gathered. Proceed to the next stage by talking to the Red Balloon.", 5120018);

                c.getPlayer().getMap().broadcastMessage(tools.packet.CField.environmentChange("gate", 2));
                c.getPlayer().getMap().broadcastMessage(tools.packet.CField.environmentChange("quest/party/clear", 3));
                c.getPlayer().getMap().broadcastMessage(tools.packet.CField.environmentChange("Party1/Clear", 4));

                c.getPlayer().getEventInstance().setProperty("stage1", "1");
                c.getPlayer().getEventInstance().setProperty("drop", "1");
            }
            return true;
        }
        return false;
    }

    public static boolean addFromDrop(final MapleClient c, final Item item, final boolean show, final boolean enhance) {
        if (handleLudiPQDrop(c, item)) {
            return false;
        }

        // 1. Defensive Checks (Null-safety & Existence)
        if (c == null || c.getPlayer() == null || item == null) {
            return false;
        }

        final MapleItemInformationProvider ii = MapleItemInformationProvider.getInstance();
        if ((ii.isPickupRestricted(item.getItemId()) && c.getPlayer().haveItem(item.getItemId(), 1, true, false))
                || (!ii.itemExists(item.getItemId()))) {
            c.sendPacket(InventoryPacket.getInventoryFull());
            c.sendPacket(InventoryPacket.showItemUnavailable());
            return false;
        }

        final MapleInventoryType type = GameConstants.getInventoryType(item.getItemId());
        final MapleCharacter chr = c.getPlayer();

        // 2. Apex Locking: Object-level synchronization
        chr.getInventoryLock().lock();
        try {
            // 3. Robust Snapshotting for Rollback
            final List<Item> existing = chr.getInventory(type).listById(item.getItemId());
            final Map<Item, Short> snapshots = new HashMap<>(); // Store original quantities
            final List<Short> addedSlots = new ArrayList<>(); // Track newly created slots for removal on fail

            for (Item e : existing) {
                if (e != null) {
                    snapshots.put(e, e.getQuantity());
                }
            }

            short remainingQuantity = item.getQuantity();
            final short slotMax = ii.getSlotMax(item.getItemId());

            try {
                // Perform Memory Modification
                if (!type.equals(MapleInventoryType.EQUIP) && !GameConstants.isRechargable(item.getItemId())) {
                    if (existing.size() > 0) {
                        for (Item eItem : existing) {
                            if (remainingQuantity <= 0) break;
                            short oldQ = eItem.getQuantity();
                            if (oldQ < slotMax && item.getOwner().equals(eItem.getOwner())
                                    && item.getExpiration() == eItem.getExpiration()) {
                                short newQ = (short) Math.min(oldQ + remainingQuantity, slotMax);
                                remainingQuantity -= (newQ - oldQ);
                                eItem.setQuantity(newQ);
                                c.sendPacket(InventoryPacket.updateInventorySlot(type, eItem, true));
                            }
                        }
                    }
                    while (remainingQuantity > 0) {
                        short newQ = (short) Math.min(remainingQuantity, slotMax);
                        remainingQuantity -= newQ;
                        Item nItem = new Item(item.getItemId(), (byte) 0, newQ, item.getFlag());
                        nItem.setExpiration(item.getExpiration());
                        nItem.setOwner(item.getOwner());
                        nItem.setPet(item.getPet());
                        nItem.setGMLog(item.getGMLog());
                        short newSlot = chr.getInventory(type).addItem(nItem);
                        if (newSlot == -1) throw new InventoryException("Inventory Full");
                        addedSlots.add(newSlot);
                        c.sendPacket(InventoryPacket.addInventorySlot(type, nItem, true));
                    }
                } else {
                    Item finalItem = item;
                    if (enhance && type.equals(MapleInventoryType.EQUIP)) {
                        finalItem = checkEnhanced(item, chr);
                    }
                    short newSlot = chr.getInventory(type).addItem(finalItem);
                    if (newSlot == -1) throw new InventoryException("Inventory Full");
                    addedSlots.add(newSlot);
                    c.sendPacket(InventoryPacket.addInventorySlot(type, finalItem, true));
                }

                // 4. Persistence Check: In Apex, this is where a transactional DB sync would be triggered.
                // If the DB call fails (SQL Exception), the exception handler below reverts memory.

                chr.havePartyQuest(item.getItemId());
                if (show) {
                    c.sendPacket(InfoPacket.getShowItemGain(item.getItemId(), item.getQuantity()));
                }
                server.LiveGuardEngine.getInstance().markDirty(chr, server.LiveGuardEngine.SaveType.ITEM_TRANSACTION, null);
                return true;

            } catch (Exception e) {
                // 5. Atomic Rollback mechanism
                // Restore quantities for merged items
                for (Map.Entry<Item, Short> entry : snapshots.entrySet()) {
                    entry.getKey().setQuantity(entry.getValue());
                    c.sendPacket(InventoryPacket.updateInventorySlot(type, entry.getKey(), true));
                }
                // Cleanup newly added slots
                for (short slot : addedSlots) {
                    chr.getInventory(type).removeSlot(slot);
                    c.sendPacket(InventoryPacket.clearInventoryItem(type, slot, true));
                }
                c.sendPacket(CWvsContext.enableActions());
                FileoutputUtil.log(FileoutputUtil.PacketEx_Log, "AddFromDrop Rollback occurred: " + e.getMessage());
                return false;
            }
        } finally {
            chr.getInventoryLock().unlock();
        }
    }

    private static Item checkEnhanced(final Item before, final MapleCharacter chr) {
        if (before instanceof Equip) {
            final Equip eq = (Equip) before;
            if (eq.getState() == 0 && (eq.getUpgradeSlots() >= 1 || eq.getLevel() >= 1)
                    && GameConstants.canScroll(eq.getItemId()) && Randomizer.nextInt(100) >= 80) { // 20% chance of pot?
                eq.resetPotential();
            }
        }
        return before;
    }

    public static boolean checkSpace(final MapleClient c, final int itemid, int quantity, final String owner) {
        final MapleItemInformationProvider ii = MapleItemInformationProvider.getInstance();
        if (c.getPlayer() == null || (ii.isPickupRestricted(itemid) && c.getPlayer().haveItem(itemid, 1, true, false))
                || (!ii.itemExists(itemid))) {
            c.sendPacket(CWvsContext.enableActions());
            return false;
        }
        if (quantity <= 0 && !GameConstants.isRechargable(itemid)) {
            return false;
        }
        final MapleInventoryType type = GameConstants.getInventoryType(itemid);
        if (c == null || c.getPlayer() == null || c.getPlayer().getInventory(type) == null) { // wtf is causing this?
            return false;
        }
        if (!type.equals(MapleInventoryType.EQUIP)) {
            final short slotMax = ii.getSlotMax(itemid);
            final List<Item> existing = c.getPlayer().getInventory(type).listById(itemid);
            if (!GameConstants.isRechargable(itemid)) {
                if (existing.size() > 0) { // first update all existing slots to slotMax
                    for (Item eItem : existing) {
                        final short oldQ = eItem.getQuantity();
                        if (oldQ < slotMax && owner != null && owner.equals(eItem.getOwner())) {
                            final short newQ = (short) Math.min(oldQ + quantity, slotMax);
                            quantity -= (newQ - oldQ);
                        }
                        if (quantity <= 0) {
                            break;
                        }
                    }
                }
            }
            // Add new slots if there is still something left
            final int numSlotsNeeded;
            if (slotMax > 0 && !GameConstants.isRechargable(itemid)) {
                numSlotsNeeded = (int) (Math.ceil(((double) quantity) / slotMax));
            } else {
                numSlotsNeeded = 1;
            }
            return !c.getPlayer().getInventory(type).isFull(numSlotsNeeded - 1);
        } else {
            return !c.getPlayer().getInventory(type).isFull();
        }
    }

    public static boolean removeFromSlot(final MapleClient c, final MapleInventoryType type, final short slot,
            final short quantity, final boolean fromDrop) {
        return removeFromSlot(c, type, slot, quantity, fromDrop, false);
    }

    public static boolean removeFromSlot(final MapleClient c, final MapleInventoryType type, final short slot,
            short quantity, final boolean fromDrop, final boolean consume) {
        if (c.getPlayer() == null || c.getPlayer().getInventory(type) == null) {
            return false;
        }
        c.getPlayer().getInventoryLock().lock();
        try {
            final Item item = c.getPlayer().getInventory(type).getItem(slot);
            if (item != null) {
                final boolean allowZero = consume && GameConstants.isRechargable(item.getItemId());
                c.getPlayer().getInventory(type).removeItem(slot, quantity, allowZero);
                if (GameConstants.isHarvesting(item.getItemId())) {
                    c.getPlayer().getStat().handleProfessionTool(c.getPlayer());
                }

                if (item.getQuantity() == 0 && !allowZero) {
                    c.sendPacket(InventoryPacket.clearInventoryItem(type, item.getPosition(), fromDrop));
                } else {
                    c.sendPacket(InventoryPacket.updateInventorySlot(type, (Item) item, fromDrop));
                }
                server.LiveGuardEngine.getInstance().markDirty(c.getPlayer(), server.LiveGuardEngine.SaveType.ITEM_TRANSACTION, null);
                return true;
            }
            return false;
        } catch (Exception e) {
            c.sendPacket(CWvsContext.enableActions());
            e.printStackTrace();
            return false;
        } finally {
            c.getPlayer().getInventoryLock().unlock();
        }
    }

    public static boolean removeById(final MapleClient c, final MapleInventoryType type, final int itemId,
            final int quantity, final boolean fromDrop, final boolean consume) {
        int remremove = quantity;
        if (c.getPlayer() == null || c.getPlayer().getInventory(type) == null) {
            return false;
        }
        for (Item item : c.getPlayer().getInventory(type).listById(itemId)) {
            int theQ = item.getQuantity();
            if (remremove <= theQ
                    && removeFromSlot(c, type, item.getPosition(), (short) remremove, fromDrop, consume)) {
                remremove = 0;
                break;
            } else if (remremove > theQ
                    && removeFromSlot(c, type, item.getPosition(), item.getQuantity(), fromDrop, consume)) {
                remremove -= theQ;
            }
        }
        return remremove <= 0;
    }

    public static boolean removeFromSlot_Lock(final MapleClient c, final MapleInventoryType type, final short slot,
            short quantity, final boolean fromDrop, final boolean consume) {
        if (c.getPlayer() == null || c.getPlayer().getInventory(type) == null) {
            return false;
        }
        final Item item = c.getPlayer().getInventory(type).getItem(slot);
        if (item != null) {
            if (ItemFlag.LOCK.check(item.getFlag()) || ItemFlag.UNTRADEABLE.check(item.getFlag())) {
                return false;
            }
            return removeFromSlot(c, type, slot, quantity, fromDrop, consume);
        }
        return false;
    }

    public static boolean removeById_Lock(final MapleClient c, final MapleInventoryType type, final int itemId) {
        for (Item item : c.getPlayer().getInventory(type).listById(itemId)) {
            if (removeFromSlot_Lock(c, type, item.getPosition(), (short) 1, false, false)) {
                return true;
            }
        }
        return false;
    }

    public static void move(final MapleClient c, final MapleInventoryType type, final short src, final short dst) {
        // 1. Defensive Checks
        if (c == null || c.getPlayer() == null || type == null || src < 0 || dst < 0 || src == dst || type == MapleInventoryType.EQUIPPED) {
            return;
        }

        final MapleCharacter chr = c.getPlayer();
        final MapleInventory inv = chr.getInventory(type);
        if (inv == null) return;

        final Item source = inv.getItem(src);
        if (source == null) return;

        final MapleItemInformationProvider ii = MapleItemInformationProvider.getInstance();

        // 2. Apex Locking
        chr.getInventoryLock().lock();
        try {
            // 3. Robust Snapshotting for Rollback
            final Item sourceSnapshot = source.copy();
            final Item initialTarget = inv.getItem(dst);
            final Item targetSnapshot = (initialTarget != null) ? initialTarget.copy() : null;

            try {
                final short slotMax = ii.getSlotMax(source.getItemId());

                // Perform Memory Operation
                inv.move(src, dst, slotMax);

                // 4. Persistence / Consistency Check logic here
                // In a production environment, this is where we'd ensure DB atomicity.

                if (GameConstants.isHarvesting(source.getItemId())) {
                    chr.getStat().handleProfessionTool(chr);
                }

                // UI Synchronization
                c.sendPacket(InventoryPacket.moveInventoryItem(type, src, dst, false, false));
                server.LiveGuardEngine.getInstance().markDirty(chr, server.LiveGuardEngine.SaveType.ITEM_TRANSACTION, null);

            } catch (Exception e) {
                // 5. Atomic Rollback mechanism
                inv.setItem(src, sourceSnapshot);
                if (targetSnapshot != null) {
                    inv.setItem(dst, targetSnapshot);
                } else {
                    inv.removeItem(dst);
                }
                c.sendPacket(CWvsContext.enableActions());
                FileoutputUtil.log(FileoutputUtil.PacketEx_Log, "Inventory Move Rollback occurred for " + chr.getName() + ": " + e.getMessage());
            }
        } finally {
            chr.getInventoryLock().unlock();
        }
    }

    public static void equip(final MapleClient c, final short src, short dst) {
        final MapleItemInformationProvider ii = MapleItemInformationProvider.getInstance();
        final MapleCharacter chr = c.getPlayer();
        if (chr == null || (GameConstants.GMS && dst == -55)) {
            return;
        }

        // 🎯 NEXUS OMNI: APEX TRANSACTIONAL LOCK
        chr.getInventoryLock().lock();
        try {
            chr.getStat().recalcLocalStats(chr);
            final PlayerStats statst = chr.getStat();
            statst.recalcLocalStats(chr);

            Equip source = (Equip) chr.getInventory(MapleInventoryType.EQUIP).getItem(src);
            Equip target = (Equip) chr.getInventory(MapleInventoryType.EQUIPPED).getItem(dst);

            if (source == null || source.getDurability() == 0 || GameConstants.isHarvesting(source.getItemId())) {
                c.getSession().write(tools.packet.CWvsContext.enableActions());
                return;
            }

            if (GameConstants.isGMEquip(source.getItemId()) && !chr.isStaff()) {
                chr.dropMessage(1, "Only Game Masters are allowed to equip this item.");
                chr.removeAll(source.getItemId(), false);
                c.getSession().write(tools.packet.CWvsContext.enableActions());
                return;
            }

            final Map<String, Integer> stats = ii.getEquipStats(source.getItemId());
            if (stats == null) {
                c.getSession().write(tools.packet.CWvsContext.enableActions());
                return;
            }

            if (dst > -1200 && dst < -999 && !GameConstants.isEvanDragonItem(source.getItemId())
                    && !GameConstants.isMechanicItem(source.getItemId())) {
                c.getSession().write(tools.packet.CWvsContext.enableActions());
                return;
            } else if ((dst <= -1200 || (dst >= -999 && dst < -99)) && !stats.containsKey("cash")) {
                c.getSession().write(tools.packet.CWvsContext.enableActions());
                return;
            } else if (dst <= -1300 && chr.getAndroid() == null) {
                c.getSession().write(tools.packet.CWvsContext.enableActions());
                return;
            }

            if (!ii.canEquip(stats, source.getItemId(), chr.getLevel(), chr.getJob(), chr.getFame(), statst.getTotalStr(),
                    statst.getTotalDex(), statst.getTotalLuk(), statst.getTotalInt(), chr.getStat().levelBonus)) {
                c.getSession().write(tools.packet.CWvsContext.enableActions());
                return;
            }

            if (GameConstants.isWeapon(source.getItemId()) && dst != -10 && dst != -11) {
                c.getSession().write(tools.packet.CWvsContext.enableActions());
                return;
            }

            if (dst == (GameConstants.GMS ? -18 : -23)
                    && !GameConstants.isMountItemAvailable(source.getItemId(), chr.getJob())) {
                c.getSession().write(tools.packet.CWvsContext.enableActions());
                return;
            }

            if (dst == (GameConstants.GMS ? -118 : -123) && source.getItemId() / 10000 != 190) {
                c.getSession().write(tools.packet.CWvsContext.enableActions());
                return;
            }
            if (dst == (GameConstants.GMS ? -59 : -55)) { // Pendant
                MapleQuestStatus qstat = chr.getQuestNoAdd(MapleQuest.getInstance(GameConstants.PENDANT_SLOT));
                if (qstat == null || qstat.getCustomData() == null
                        || Long.parseLong(qstat.getCustomData()) < System.currentTimeMillis()) {
                    c.getSession().write(tools.packet.CWvsContext.enableActions());
                    return;
                }
            }

            if (GameConstants.isKatara(source.getItemId()) || source.getItemId() / 10000 == 135) {
                dst = (byte) -10; // Shield slot
            }

            // Handle Ring Conflict
            if (source.getItemId() / 1000 == 1112) { // Ring
                for (RingSet s : RingSet.values()) {
                    if (s.id.contains(Integer.valueOf(source.getItemId()))) {
                        List<Integer> theList = chr.getInventory(MapleInventoryType.EQUIPPED).listIds();
                        for (Integer i : s.id) {
                            if (theList.contains(i)) {
                                chr.dropMessage(1, "You may not equip this item because you already have a "
                                        + (tools.StringUtil.makeEnumHumanReadable(s.name())) + " equipped.");
                                c.getSession().write(tools.packet.CWvsContext.enableActions());
                                return;
                            }
                        }
                    }
                }
            }

            // Handle Top/Bottom/Overall Conflict
            switch (dst) {
                case -6: { // Top
                    final Item top = chr.getInventory(MapleInventoryType.EQUIPPED).getItem((byte) -5);
                    if (top != null && GameConstants.isOverall(top.getItemId())) {
                        if (chr.getInventory(MapleInventoryType.EQUIP).isFull()) {
                            c.getSession().write(tools.packet.CWvsContext.InventoryPacket.getInventoryFull());
                            return;
                        }
                        unequip(c, (byte) -5, chr.getInventory(MapleInventoryType.EQUIP).getNextFreeSlot());
                    }
                    break;
                }
                case -5: { // Overall
                    final Item top = chr.getInventory(MapleInventoryType.EQUIPPED).getItem((byte) -5);
                    final Item bottom = chr.getInventory(MapleInventoryType.EQUIPPED).getItem((byte) -6);
                    if (top != null && GameConstants.isOverall(source.getItemId())) {
                        if (chr.getInventory(MapleInventoryType.EQUIP).isFull(bottom != null ? 1 : 0)) {
                            c.getSession().write(tools.packet.CWvsContext.InventoryPacket.getInventoryFull());
                            return;
                        }
                        unequip(c, (byte) -5, chr.getInventory(MapleInventoryType.EQUIP).getNextFreeSlot());
                    }
                    if (bottom != null && GameConstants.isOverall(source.getItemId())) {
                        if (chr.getInventory(MapleInventoryType.EQUIP).isFull()) {
                            c.getSession().write(tools.packet.CWvsContext.InventoryPacket.getInventoryFull());
                            return;
                        }
                        unequip(c, (byte) -6, chr.getInventory(MapleInventoryType.EQUIP).getNextFreeSlot());
                    }
                    break;
                }
                case -10: { // Shield
                    Item weapon = chr.getInventory(MapleInventoryType.EQUIPPED).getItem((byte) -11);
                    if (GameConstants.isKatara(source.getItemId())) {
                        if ((chr.getJob() != 900 && (chr.getJob() < 430 || chr.getJob() > 434)) || weapon == null
                                || !GameConstants.isDagger(weapon.getItemId())) {
                            c.getSession().write(tools.packet.CWvsContext.InventoryPacket.getInventoryFull());
                            return;
                        }
                    } else if (weapon != null && GameConstants.isTwoHanded(weapon.getItemId())
                            && !GameConstants.isSpecialTwoHandedJob(chr.getJob())) {
                        if (chr.getInventory(MapleInventoryType.EQUIP).isFull()) {
                            c.getSession().write(tools.packet.CWvsContext.InventoryPacket.getInventoryFull());
                            return;
                        }
                        unequip(c, (byte) -11, chr.getInventory(MapleInventoryType.EQUIP).getNextFreeSlot());
                    }
                    break;
                }
                case -11: { // Weapon
                    Item shield = chr.getInventory(MapleInventoryType.EQUIPPED).getItem((byte) -10);
                    if (shield != null && GameConstants.isTwoHanded(source.getItemId())
                            && !GameConstants.isSpecialTwoHandedJob(shield.getItemId())) {
                        if (chr.getInventory(MapleInventoryType.EQUIP).isFull()) {
                            c.getSession().write(tools.packet.CWvsContext.InventoryPacket.getInventoryFull());
                            return;
                        }
                        unequip(c, (byte) -10, chr.getInventory(MapleInventoryType.EQUIP).getNextFreeSlot());
                    }
                    break;
                }
            }

            source = (Equip) chr.getInventory(MapleInventoryType.EQUIP).getItem(src);
            target = (Equip) chr.getInventory(MapleInventoryType.EQUIPPED).getItem(dst);
            if (source == null) {
                c.getSession().write(tools.packet.CWvsContext.enableActions());
                return;
            }

            short flag = source.getFlag();
            if (stats.get("equipTradeBlock") != null || source.getItemId() / 10000 == 167) {
                if (!ItemFlag.UNTRADEABLE.check(flag)) {
                    flag |= ItemFlag.UNTRADEABLE.getValue();
                    source.setFlag(flag);
                    c.getSession().write(tools.packet.CWvsContext.InventoryPacket.updateSpecialItemUse_(source, MapleInventoryType.EQUIP.getType(), chr));
                }
            }

            // Android Handling
            if (source.getItemId() / 10000 == 166) {
                if (source.getAndroid() == null) {
                    final int uid = MapleInventoryIdentifier.getInstance();
                    source.setUniqueId(uid);
                    source.setAndroid(MapleAndroid.create(source.getItemId(), uid));
                    flag |= ItemFlag.LOCK.getValue() | ItemFlag.UNTRADEABLE.getValue() | ItemFlag.ANDROID_ACTIVATED.getValue();
                    source.setFlag(flag);
                    c.getSession().write(tools.packet.CWvsContext.InventoryPacket.updateSpecialItemUse_(source, MapleInventoryType.EQUIP.getType(), chr));
                }
                chr.removeAndroid();
                chr.setAndroid(source.getAndroid());
            } else if (dst <= -1300 && chr.getAndroid() != null) {
                chr.setAndroid(chr.getAndroid());
            }

            // Charm EXP
            if (source.getCharmEXP() > 0 && !ItemFlag.CHARM_EQUIPPED.check(flag)) {
                chr.getTrait(MapleTraitType.charm).addExp(source.getCharmEXP(), chr);
                source.setCharmEXP((short) 0);
                flag |= ItemFlag.CHARM_EQUIPPED.getValue();
                source.setFlag(flag);
                c.getSession().write(tools.packet.CWvsContext.InventoryPacket.updateSpecialItemUse_(source, GameConstants.getInventoryType(source.getItemId()).getType(), chr));
            }

            // Perform Equipment Swap
            chr.getInventory(MapleInventoryType.EQUIP).removeSlot(src);
            if (target != null) {
                chr.getInventory(MapleInventoryType.EQUIPPED).removeSlot(dst);
            }
            source.setPosition(dst);
            chr.getInventory(MapleInventoryType.EQUIPPED).addFromDB(source);
            if (target != null) {
                target.setPosition(src);
                chr.getInventory(MapleInventoryType.EQUIP).addFromDB(target);
            }

            // Cancel Buffs
            if (GameConstants.isWeapon(source.getItemId())) {
                chr.cancelEffectFromBuffStat(MapleBuffStat.BOOSTER);
                chr.cancelEffectFromBuffStat(MapleBuffStat.SPIRIT_CLAW);
                chr.cancelEffectFromBuffStat(MapleBuffStat.SOULARROW);
                chr.cancelEffectFromBuffStat(MapleBuffStat.WK_CHARGE);
                chr.cancelEffectFromBuffStat(MapleBuffStat.LIGHTNING_CHARGE);
            }
            if (source.getItemId() / 10000 == 190 || source.getItemId() / 10000 == 191) {
                chr.cancelEffectFromBuffStat(MapleBuffStat.MONSTER_RIDING);
                chr.cancelEffectFromBuffStat(MapleBuffStat.MECH_CHANGE);
            }

            // Handle Latent Skills (Potential/Sockets)
            if (source.getState() >= 17) {
                final Map<Skill, SkillEntry> ss = new HashMap<>();
                int[] potentials = { source.getPotential1(), source.getPotential2(), source.getPotential3(), source.getPotential4(), source.getPotential5() };
                for (int i : potentials) {
                    if (i > 0) {
                        StructItemOption pot = ii.getPotentialInfo(i).get(ii.getReqLevel(source.getItemId()) / 10);
                        if (pot != null && pot.get("skillID") > 0) {
                            ss.put(SkillFactory.getSkill(PlayerStats.getSkillByJob(pot.get("skillID"), chr.getJob())), new SkillEntry((byte) 1, (byte) 0, -1));
                        }
                    }
                }
                chr.changeSkillLevel_Skip(ss, true);
            }

            c.getSession().write(tools.packet.CWvsContext.InventoryPacket.moveInventoryItem(MapleInventoryType.EQUIP, src, dst, (byte) 2, false, false));
            chr.equipChanged();
            
            // 🚀 PERSIST CHANGE
            server.LiveGuardEngine.getInstance().markDirty(chr, server.LiveGuardEngine.SaveType.ITEM_TRANSACTION, null);

        } catch (Exception e) {
            c.getSession().write(tools.packet.CWvsContext.enableActions());
            e.printStackTrace();
        } finally {
            chr.getInventoryLock().unlock();
        }
    }

    public static void unequip(final MapleClient c, final short src, final short dst) {
        final MapleCharacter chr = c.getPlayer();
        if (chr == null) return;

        // 🎯 NEXUS OMNI: APEX TRANSACTIONAL LOCK
        chr.getInventoryLock().lock();
        try {
            Equip source = (Equip) chr.getInventory(MapleInventoryType.EQUIPPED).getItem(src);
            Equip target = (Equip) chr.getInventory(MapleInventoryType.EQUIP).getItem(dst);

            if (dst < 0 || source == null || (GameConstants.GMS && src == -55)) {
                return;
            }
            if (target != null && src <= 0) { // Do not allow switching with equip
                c.getSession().write(tools.packet.CWvsContext.InventoryPacket.getInventoryFull());
                return;
            }
            chr.getInventory(MapleInventoryType.EQUIPPED).removeSlot(src);
            if (target != null) {
                chr.getInventory(MapleInventoryType.EQUIP).removeSlot(dst);
            }
            source.setPosition(dst);
            chr.getInventory(MapleInventoryType.EQUIP).addFromDB(source);
            if (target != null) {
                target.setPosition(src);
                chr.getInventory(MapleInventoryType.EQUIPPED).addFromDB(target);
            }
            if (GameConstants.isWeapon(source.getItemId())) {
                chr.cancelEffectFromBuffStat(MapleBuffStat.BOOSTER);
                chr.cancelEffectFromBuffStat(MapleBuffStat.SPIRIT_CLAW);
                chr.cancelEffectFromBuffStat(MapleBuffStat.SOULARROW);
                chr.cancelEffectFromBuffStat(MapleBuffStat.WK_CHARGE);
                chr.cancelEffectFromBuffStat(MapleBuffStat.LIGHTNING_CHARGE);
            }
            if (source.getItemId() / 10000 == 190 || source.getItemId() / 10000 == 191) {
                chr.cancelEffectFromBuffStat(MapleBuffStat.MONSTER_RIDING);
                chr.cancelEffectFromBuffStat(MapleBuffStat.MECH_CHANGE);
            }
            c.getSession().write(tools.packet.CWvsContext.InventoryPacket.moveInventoryItem(MapleInventoryType.EQUIP, src, dst, (byte) 1, false, false));
            chr.equipChanged();
            
            // 🚀 PERSIST CHANGE
            server.LiveGuardEngine.getInstance().markDirty(chr, server.LiveGuardEngine.SaveType.ITEM_TRANSACTION, null);

        } catch (Exception e) {
            c.getSession().write(tools.packet.CWvsContext.enableActions());
            e.printStackTrace();
        } finally {
            chr.getInventoryLock().unlock();
        }
    }

    public static boolean drop(final MapleClient c, MapleInventoryType type, final short slot, final short quantity) {
        return drop(c, type, slot, quantity, false);
    }

    public static boolean drop(final MapleClient c, MapleInventoryType type, final short slot, final short quantity, final boolean npcInduced) {
        final MapleCharacter chr = c.getPlayer();

        if (chr == null || chr.getMap() == null || chr.getInventory(type).getItem(slot) == null) {
            c.getSession().write(CWvsContext.enableActions());
            return false;
        }

        chr.getInventoryLock().lock();
        try {
            final Item item = chr.getInventory(type).getItem(slot);
            if (quantity < 0 || (quantity > 0 && item.getQuantity() < quantity) || (item.getQuantity() > 1 && quantity == -1)) {
                return false;
            }

            // GMS v117 Persistence Check: Mark for Live-Guard tracking
            server.LiveGuardEngine.getInstance().markDirty(chr, server.LiveGuardEngine.SaveType.ITEM_TRANSACTION, null);

            final short newQuantity = (short) (item.getQuantity() - quantity);
            if (newQuantity < 0) {
                return false;
            }

            if (newQuantity == 0) {
                chr.getInventory(type).removeItem(slot);
                c.getSession().write(InventoryPacket.dropInventoryItem(type, slot));
            } else {
                item.setQuantity(newQuantity);
                c.getSession().write(InventoryPacket.updateInventorySlot(type, item, false));
            }

            if (quantity > 0) {
                final Item dropItem = item.copy();
                dropItem.setQuantity(quantity);
                chr.getMap().spawnItemDrop(chr, chr, dropItem, chr.getTruePosition(), true, true);
            }

            return true;
        } catch (Exception e) {
            FileoutputUtil.outputFileError(FileoutputUtil.PacketEx_Log, e);
            return false;
        } finally {
            // THE CRITICAL UNLOCK - Prevents the Action-Lock Deadlock
            chr.getInventoryLock().unlock();
            chr.saveToDB(false, false);
            // UNFREEZE THE CLIENT
            c.getSession().write(CWvsContext.enableActions());
        }
    }
}
