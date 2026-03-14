package database;

import client.inventory.Equip;
import client.inventory.Item;
import client.inventory.MapleAndroid;
import client.inventory.MapleInventoryIdentifier;
import client.inventory.MapleInventoryType;
import client.inventory.MaplePet;
import client.inventory.MapleRing;
import constants.GameConstants;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import server.MapleItemInformationProvider;
import tools.Pair;

/**
 * Item Data Access Object (DAO)
 * [Phase B] Optimized with Connection Injection, Batching, and Try-with-resources.
 */
public class ItemDAO {

    public static Map<Long, Pair<Item, MapleInventoryType>> loadItems(Connection con, int id, boolean login, String table, String table_equip, String arg, int typeValue) throws SQLException {
        Map<Long, Pair<Item, MapleInventoryType>> items = new LinkedHashMap<>();
        StringBuilder query = new StringBuilder();
        query.append("SELECT * FROM `").append(table).append("` LEFT JOIN `").append(table_equip)
                .append("` USING(`inventoryitemid`) WHERE `type` = ? AND `").append(arg).append("` = ?");

        if (login) {
            query.append(" AND `inventorytype` = ").append(MapleInventoryType.EQUIPPED.getType());
        }

        try (PreparedStatement ps = con.prepareStatement(query.toString())) {
            ps.setInt(1, typeValue);
            ps.setInt(2, id);
            try (ResultSet rs = ps.executeQuery()) {
                final MapleItemInformationProvider ii = MapleItemInformationProvider.getInstance();
                while (rs.next()) {
                    int itemId = rs.getInt("itemid");
                    if (!ii.itemExists(itemId)) {
                        continue;
                    }
                    MapleInventoryType mit = MapleInventoryType.getByType(rs.getByte("inventorytype"));

                    if (mit.equals(MapleInventoryType.EQUIP) || mit.equals(MapleInventoryType.EQUIPPED)) {
                        Equip equip = new Equip(itemId, rs.getShort("position"), rs.getInt("uniqueid"), rs.getShort("flag"));
                        if (!login && equip.getPosition() != -55) {
                            equip.setQuantity((short) 1);
                            equip.setInventoryId(rs.getLong("inventoryitemid"));
                            equip.setOwner(rs.getString("owner"));
                            equip.setExpiration(rs.getLong("expiredate"));
                            equip.setUpgradeSlots(rs.getByte("upgradeslots"));
                            equip.setLevel(rs.getByte("level"));
                            equip.setStr(rs.getShort("str"));
                            equip.setDex(rs.getShort("dex"));
                            equip.setInt(rs.getShort("int"));
                            equip.setLuk(rs.getShort("luk"));
                            equip.setHp(rs.getShort("hp"));
                            equip.setMp(rs.getShort("mp"));
                            equip.setWatk(rs.getShort("watk"));
                            equip.setMatk(rs.getShort("matk"));
                            equip.setWdef(rs.getShort("wdef"));
                            equip.setMdef(rs.getShort("mdef"));
                            equip.setAcc(rs.getShort("acc"));
                            equip.setAvoid(rs.getShort("avoid"));
                            equip.setHands(rs.getShort("hands"));
                            equip.setSpeed(rs.getShort("speed"));
                            equip.setJump(rs.getShort("jump"));
                            equip.setViciousHammer(rs.getByte("ViciousHammer"));
                            equip.setItemEXP(rs.getInt("itemEXP"));
                            equip.setGMLog(rs.getString("GM_Log"));
                            equip.setDurability(rs.getInt("durability"));
                            equip.setEnhance(rs.getByte("enhance"));
                            equip.setPotential1(rs.getInt("potential1"));
                            equip.setPotential2(rs.getInt("potential2"));
                            equip.setPotential3(rs.getInt("potential3"));
                            equip.setPotential4(rs.getInt("potential4"));
                            equip.setPotential5(rs.getInt("potential5"));
                            equip.setSocket1(rs.getInt("socket1"));
                            equip.setSocket2(rs.getInt("socket2"));
                            equip.setSocket3(rs.getInt("socket3"));
                            equip.setGiftFrom(rs.getString("sender"));
                            equip.setIncSkill(rs.getInt("incSkill"));
                            equip.setPVPDamage(rs.getShort("pvpDamage"));
                            equip.setCharmEXP(rs.getShort("charmEXP"));
                            if (equip.getCharmEXP() < 0) {
                                equip.setCharmEXP(((Equip) ii.getEquipById(equip.getItemId())).getCharmEXP());
                            }
                            if (equip.getUniqueId() > -1) {
                                if (GameConstants.isEffectRing(itemId)) {
                                    MapleRing ring = MapleRing.loadFromDb(con, equip.getUniqueId(), mit.equals(MapleInventoryType.EQUIPPED));
                                    if (ring != null) {
                                        equip.setRing(ring);
                                    }
                                } else if (itemId / 10000 == 166) {
                                    MapleAndroid ring = MapleAndroid.loadFromDb(con, itemId, equip.getUniqueId());
                                    if (ring != null) {
                                        equip.setAndroid(ring);
                                    }
                                }
                            }
                        }
                        items.put(rs.getLong("inventoryitemid"), new Pair<Item, MapleInventoryType>(equip.copy(), mit));
                    } else {
                        Item item = new Item(itemId, rs.getShort("position"), rs.getShort("quantity"), rs.getShort("flag"), rs.getInt("uniqueid"));
                        item.setOwner(rs.getString("owner"));
                        item.setInventoryId(rs.getLong("inventoryitemid"));
                        item.setExpiration(rs.getLong("expiredate"));
                        item.setGMLog(rs.getString("GM_Log"));
                        item.setGiftFrom(rs.getString("sender"));
                        if (GameConstants.isPet(itemId)) {
                            if (item.getUniqueId() > -1) {
                                MaplePet pet = MaplePet.loadFromDb(con, itemId, item.getUniqueId(), item.getPosition());
                                if (pet != null) {
                                    item.setPet(pet);
                                }
                            } else {
                                item.setPet(MaplePet.createPet(itemId, MapleInventoryIdentifier.getInstance())); // Note: creation still uses its own connection, but this branch is rarely hit during load
                            }
                        }
                        items.put(rs.getLong("inventoryitemid"), new Pair<Item, MapleInventoryType>(item.copy(), mit));
                    }
                }
            }
        }
        return items;
    }

    public static void saveItems(Connection con, List<Pair<Item, MapleInventoryType>> items, int id, String table, String table_equip, String arg, int typeValue) throws SQLException {
        // Delete old items
        String deleteQuery = "DELETE FROM `" + table + "` WHERE `type` = ? AND `" + arg + "` = ?";
        try (PreparedStatement ps = con.prepareStatement(deleteQuery)) {
            ps.setInt(1, typeValue);
            ps.setInt(2, id);
            ps.executeUpdate();
        }

        if (items != null && !items.isEmpty()) {
            String insertQuery = "INSERT INTO `" + table + "` (" + arg + ", itemid, inventorytype, position, quantity, owner, GM_Log, uniqueid, expiredate, flag, `type`, sender) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
            String equipQuery = "INSERT INTO " + table_equip + " (inventoryitemid, upgradeslots, level, str, dex, `int`, luk, hp, mp, watk, matk, wdef, mdef, acc, avoid, hands, speed, jump, ViciousHammer, itemEXP, durability, enhance, potential1, potential2, potential3, potential4, potential5, socket1, socket2, socket3, incSkill, charmEXP, pvpDamage) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

            try (PreparedStatement ps = con.prepareStatement(insertQuery, Statement.RETURN_GENERATED_KEYS);
                 PreparedStatement pse = con.prepareStatement(equipQuery)) {

                for (Pair<Item, MapleInventoryType> pair : items) {
                    Item item = pair.getLeft();
                    MapleInventoryType mit = pair.getRight();
                    if (item.getPosition() == -55) continue; // Unused or special position

                    ps.setInt(1, id);
                    ps.setInt(2, item.getItemId());
                    ps.setInt(3, mit.getType());
                    ps.setInt(4, item.getPosition());
                    ps.setInt(5, item.getQuantity());
                    ps.setString(6, item.getOwner());
                    ps.setString(7, item.getGMLog());
                    ps.setInt(8, item.getPet() != null ? Math.max(item.getUniqueId(), item.getPet().getUniqueId()) : item.getUniqueId());
                    ps.setLong(9, item.getExpiration());
                    ps.setShort(10, item.getFlag());
                    ps.setByte(11, (byte) typeValue);
                    ps.setString(12, item.getGiftFrom());
                    ps.executeUpdate();

                    try (ResultSet rs = ps.getGeneratedKeys()) {
                        if (rs.next()) {
                            long iid = rs.getLong(1);
                            item.setInventoryId(iid);
                            if (mit.equals(MapleInventoryType.EQUIP) || mit.equals(MapleInventoryType.EQUIPPED)) {
                                Equip equip = (Equip) item;
                                pse.setLong(1, iid);
                                pse.setInt(2, equip.getUpgradeSlots());
                                pse.setInt(3, equip.getLevel());
                                pse.setInt(4, equip.getStr());
                                pse.setInt(5, equip.getDex());
                                pse.setInt(6, equip.getInt());
                                pse.setInt(7, equip.getLuk());
                                pse.setInt(8, equip.getHp());
                                pse.setInt(9, equip.getMp());
                                pse.setInt(10, equip.getWatk());
                                pse.setInt(11, equip.getMatk());
                                pse.setInt(12, equip.getWdef());
                                pse.setInt(13, equip.getMdef());
                                pse.setInt(14, equip.getAcc());
                                pse.setInt(15, equip.getAvoid());
                                pse.setInt(16, equip.getHands());
                                pse.setInt(17, equip.getSpeed());
                                pse.setInt(18, equip.getJump());
                                pse.setInt(19, equip.getViciousHammer());
                                pse.setInt(20, equip.getItemEXP());
                                pse.setInt(21, equip.getDurability());
                                pse.setByte(22, equip.getEnhance());
                                pse.setInt(23, equip.getPotential1());
                                pse.setInt(24, equip.getPotential2());
                                pse.setInt(25, equip.getPotential3());
                                pse.setInt(26, equip.getPotential4());
                                pse.setInt(27, equip.getPotential5());
                                pse.setInt(28, equip.getSocket1());
                                pse.setInt(29, equip.getSocket2());
                                pse.setInt(30, equip.getSocket3());
                                pse.setInt(31, equip.getIncSkill());
                                pse.setShort(32, equip.getCharmEXP());
                                pse.setShort(33, equip.getPVPDamage());
                                pse.addBatch();
                            }
                        }
                    }
                }
                pse.executeBatch();
            }
        }
    }
}
