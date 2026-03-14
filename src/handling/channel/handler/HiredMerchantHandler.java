/*
 This file is part of the OdinMS Maple Story Server
 Copyright (C) 2008 ~ 2010 Patrick Huy <patrick.huy@frz.cc> 
 Matthias Butz <matze@odinms.de>
 Jan Christian Meyer <vimes@odinms.de>

 This program is free software: you can redistribute it and/or modify
 it under the terms of the GNU Affero General Public License version 3
 as published by the Free Software Foundation. You may not use, modify
 or distribute this program under any other version of the
 GNU Affero General Public License.

 This program is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU Affero General Public License for more details.

 You should have received a copy of the GNU Affero General Public License
 along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
package handling.channel.handler;

import java.util.List;
import java.util.ArrayList;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import client.inventory.Item;
import client.inventory.MapleInventoryType;
import client.MapleClient;
import client.MapleCharacter;
import constants.GameConstants;
import client.inventory.ItemLoader;
import database.DatabaseConnection;
import handling.world.World;
import java.util.Map;
import server.MapleInventoryManipulator;
import server.MapleItemInformationProvider;
import server.MerchItemPackage;
import tools.Pair;
import tools.StringUtil;
import tools.packet.PlayerShopPacket;
import tools.data.LittleEndianAccessor;
import tools.packet.CField.NPCPacket;
import tools.packet.CWvsContext;

public class HiredMerchantHandler {

    private HiredMerchantHandler() {
    }

    public static final boolean UseHiredMerchant(final MapleClient c, final boolean packet) {
        if (c.getPlayer().getMap() != null && c.getPlayer().getMap().allowPersonalShop()) {
            final byte state = checkExistance(c.getPlayer().getAccountID(), c.getPlayer().getId());

            switch (state) {
                case 1:
                    c.getPlayer().dropMessage(1, "Please claim your items from Fredrick first.");
                    break;
                case 0:
                    boolean merch = World.hasMerchant(c.getPlayer().getAccountID(), c.getPlayer().getId());
                    if (!merch) {
                        if (c.getChannelServer().isShutdown()) {
                            c.getPlayer().dropMessage(1, "Zipangu is about to shut down.");
                            return false;
                        }
                        // VALIDATION: Hard lock - cannot open shop while busy
                        if (c.getPlayer().getTrade() != null || c.getPlayer().getConversation() > 0 || c.getPlayer().getEventInstance() != null) {
                            c.getPlayer().dropMessage(1, "You cannot open a shop while busy with another activity.");
                            return false;
                        }
                        if (packet) {
                            c.getSession().write(PlayerShopPacket.sendTitleBox());
                        }
                        return true;
                    } else {
                        c.getPlayer().dropMessage(1, "Please close the existing store and try again.");
                    }
                    break;
                default:
                    c.getPlayer().dropMessage(1, "An unknown error occured.");
                    break;
            }
        } else {
            c.getSession().close();
        }
        return false;
    }

    private static final byte checkExistance(final int accid, final int cid) {
        try (Connection con = DatabaseConnection.getConnection();
             PreparedStatement ps = con.prepareStatement("SELECT * from hiredmerch where accountid = ? OR characterid = ?")) {
            ps.setInt(1, accid);
            ps.setInt(2, cid);
            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next()) {
                    return 1;
                }
            }
            return 0;
        } catch (SQLException se) {
            return -1;
        }
    }

    public static synchronized void displayMerch(MapleClient c) { // Synchronized to prevent multi-retrieval
        final int conv = c.getPlayer().getConversation();
        boolean merch = World.hasMerchant(c.getPlayer().getAccountID(), c.getPlayer().getId());
        if (merch) {
            c.getPlayer().dropMessage(1, "Please close the existing store and try again.");
            c.getPlayer().setConversation(0);
        } else if (c.getChannelServer().isShutdown()) {
            c.getPlayer().dropMessage(1, "Zipangu is going to shut down.");
            c.getPlayer().setConversation(0);
        } else if (conv == 3) { // Hired Merch
            final MerchItemPackage pack = loadItemFromDatabase(c.getPlayer().getAccountID());

            if (pack == null) {
                c.getPlayer().dropMessage(1, "You do not have any items with Fredrick.");
                c.getPlayer().setConversation(0);
            } else if (pack.getItems().size() <= 0) { // Meso only retrieval
                if (!check(c.getPlayer(), pack)) {
                    c.getSession().write(PlayerShopPacket.merchItem_Message((byte) 0x21));
                    return;
                }
                if (deletePackage(c.getPlayer().getAccountID(), pack.getPackageid(), c.getPlayer().getId())) {
                    c.getPlayer().gainMeso(pack.getMesos(), false);
                    c.getSession().write(PlayerShopPacket.merchItem_Message((byte) 0x1d));
                    c.getPlayer().dropMessage(1, "You have retrieved your mesos.");
                } else {
                    c.getPlayer().dropMessage(1, "An unknown error occured.");
                }
                c.getPlayer().setConversation(0);
            } else {
                // Just show the UI. The retrieval happens in requestItems.
                c.getSession().write(PlayerShopPacket.merchItemStore_ItemData(pack));
            }
        }
        c.getSession().write(CWvsContext.enableActions());
    }

    public static final void MerchantItemStore(final LittleEndianAccessor slea, final MapleClient c) {
        if (c.getPlayer() == null) {
            return;
        }
        final byte operation = slea.readByte();
        if (operation == 27 || operation == 28) { // Request, Take out
            requestItems(c, operation == 27);
        } else if (operation == 30) { // Exit
            c.getPlayer().setConversation(0);
        }
    }

    private static synchronized void requestItems(final MapleClient c, final boolean request) {
        final MapleCharacter chr = c.getPlayer();
        if (chr == null || chr.getConversation() != 3) {
            return;
        }
        if (World.hasMerchant(chr.getAccountID(), chr.getId())) {
            chr.dropMessage(1, "Please close the existing store and try again.");
            chr.setConversation(0);
            return;
        }
        final MerchItemPackage pack = loadItemFromDatabase(chr.getAccountID());
        if (pack == null) {
            chr.dropMessage(1, "An unknown error occured.");
            return;
        } else if (c.getChannelServer().isShutdown()) {
            chr.dropMessage(1, "Zipangu is going to shut down.");
            chr.setConversation(0);
            return;
        }
        final int days = StringUtil.getDaysAmount(pack.getSavedTime(), System.currentTimeMillis()); 
        final double percentage = days / 100.0;
        final int fee = (int) Math.ceil(percentage * pack.getMesos()); 
        
        if (request && days > 0 && percentage > 0 && pack.getMesos() > 0 && fee > 0) {
            c.getSession().write(PlayerShopPacket.merchItemStore((byte) 38, days, fee));
            return;
        }
        if (fee < 0 || chr.getMeso() < fee) {
            c.getSession().write(PlayerShopPacket.merchItem_Message(fee < 0 ? 33 : 35));
            return;
        }
        
        // 1. Lock Player Inventory
        chr.getInventoryLock().lock();
        try {
            if (!check(chr, pack)) {
                c.getSession().write(PlayerShopPacket.merchItem_Message(36));
                return;
            }

            // ATOMIC RETRIEVAL: Memory Update followed by DB Consistency check
            // We use the deletePackage as our transaction commit point.
            if (deletePackage(chr.getAccountID(), pack.getPackageid(), chr.getId())) {
                if (fee > 0) {
                    chr.gainMeso(-fee, true);
                }
                chr.gainMeso(pack.getMesos(), false);
                for (Item item : pack.getItems()) {
                    MapleInventoryManipulator.addFromDrop(c, item, false, false);
                }
                c.getSession().write(PlayerShopPacket.merchItem_Message(32));
                chr.setConversation(0);
            } else {
                chr.dropMessage(1, "Database error. Retrieval failed.");
            }
        } finally {
            chr.getInventoryLock().unlock();
        }
    }

    private static final boolean check(final MapleCharacter chr, final MerchItemPackage pack) {
        if (chr.getMeso() + pack.getMesos() < 0) {
            return false;
        }
        byte eq = 0, use = 0, setup = 0, etc = 0, cash = 0;
        for (Item item : pack.getItems()) {
            final MapleInventoryType invtype = GameConstants.getInventoryType(item.getItemId());
            if (invtype == MapleInventoryType.EQUIP) {
                eq++;
            } else if (invtype == MapleInventoryType.USE) {
                use++;
            } else if (invtype == MapleInventoryType.SETUP) {
                setup++;
            } else if (invtype == MapleInventoryType.ETC) {
                etc++;
            } else if (invtype == MapleInventoryType.CASH) {
                cash++;
            }
            if (MapleItemInformationProvider.getInstance().isPickupRestricted(item.getItemId()) && chr.haveItem(item.getItemId(), 1)) {
                return false;
            }
        }
        if (chr.getInventory(MapleInventoryType.EQUIP).getNumFreeSlot() < eq || chr.getInventory(MapleInventoryType.USE).getNumFreeSlot() < use || chr.getInventory(MapleInventoryType.SETUP).getNumFreeSlot() < setup || chr.getInventory(MapleInventoryType.ETC).getNumFreeSlot() < etc || chr.getInventory(MapleInventoryType.CASH).getNumFreeSlot() < cash) {
            return false;
        }
        return true;
    }

    private static final boolean deletePackage(final int accid, final int packageid, final int chrId) {
        try (Connection con = DatabaseConnection.getConnection();
             PreparedStatement ps = con.prepareStatement("DELETE from hiredmerch where accountid = ? OR packageid = ? OR characterid = ?")) {
            ps.setInt(1, accid);
            ps.setInt(2, packageid);
            ps.setInt(3, chrId);
            ps.executeUpdate();
            ItemLoader.HIRED_MERCHANT.saveItems(null, packageid);
            return true;
        } catch (SQLException e) {
            return false;
        }
    }
    
    public static void showFredrick(MapleClient c) {
        final MerchItemPackage pack = HiredMerchantHandler.loadItemFromDatabase(c.getPlayer().getAccountID());
        c.getSession().write(PlayerShopPacket.merchItemStore_ItemData(pack));
    }

    private static final MerchItemPackage loadItemFromDatabase(final int accountid) {
        try (Connection con = DatabaseConnection.getConnection();
             PreparedStatement ps = con.prepareStatement("SELECT * from hiredmerch where accountid = ?")) {
            ps.setInt(1, accountid);
            try (ResultSet rs = ps.executeQuery()) {
                if (!rs.next()) {
                    return null;
                }
                final int packageid = rs.getInt("PackageId");
                final MerchItemPackage pack = new MerchItemPackage();
                pack.setPackageid(packageid);
                pack.setMesos(rs.getInt("Mesos"));
                pack.setSavedTime(rs.getLong("time"));

                Map<Long, Pair<Item, MapleInventoryType>> items = ItemLoader.HIRED_MERCHANT.loadItems(false, packageid);
                if (items != null) {
                    List<Item> iters = new ArrayList<Item>();
                    for (Pair<Item, MapleInventoryType> z : items.values()) {
                        iters.add(z.left);
                    }
                    pack.setItems(iters);
                }
                return pack;
            }
        } catch (SQLException e) {
            e.printStackTrace();
            return null;
        }
    }
}