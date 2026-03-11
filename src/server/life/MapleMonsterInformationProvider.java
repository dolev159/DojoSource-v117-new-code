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
package server.life;

import constants.GameConstants;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import java.util.ArrayList;
import java.util.Map;

import client.inventory.MapleInventoryType;
import database.DatabaseConnection;
import java.io.File;
import java.util.Map.Entry;
import provider.MapleData;
import provider.MapleDataProvider;
import provider.MapleDataProviderFactory;
import provider.MapleDataTool;
import server.MapleItemInformationProvider;
import server.StructFamiliar;

import java.util.concurrent.ConcurrentHashMap;
import java.util.Collections;

public class MapleMonsterInformationProvider {

    private static final MapleMonsterInformationProvider instance = new MapleMonsterInformationProvider();
    private final Map<Integer, List<MonsterDropEntry>> drops = new ConcurrentHashMap<>();
    private final List<MonsterGlobalDropEntry> globaldrops = new ArrayList<>();
    private static final MapleDataProvider stringDataWZ = MapleDataProviderFactory.getDataProvider(new File(System.getProperty("net.sf.odinms.wzpath") + "/String.wz"));
    private static final MapleData mobStringData = stringDataWZ.getData("MonsterBook.img");
    private final Map<MonsterDropEntry, MonsterDropEntry> interner = new HashMap<>();

    public static MapleMonsterInformationProvider getInstance() {
        return instance;
    }

    public List<MonsterGlobalDropEntry> getGlobalDrop() {
        return globaldrops;
    }

    public void load() {
        long start = System.currentTimeMillis();
        reload();
        System.out.println("MapleMonsterInformationProvider loaded in " + (System.currentTimeMillis() - start) + "ms.");
    }

    public void reload() {
        drops.clear();
        globaldrops.clear();
        interner.clear();
        
        loadGlobalDrops();
        loadAllDrops();
        addExtra();
        
        interner.clear(); // Clear interner after loading to save memory
    }

    private void loadGlobalDrops() {
        try (Connection con = DatabaseConnection.getConnection();
             PreparedStatement ps = con.prepareStatement("SELECT * FROM drop_data_global WHERE chance > 0");
             ResultSet rs = ps.executeQuery()) {

            while (rs.next()) {
                globaldrops.add(new MonsterGlobalDropEntry(
                        rs.getInt("itemid"),
                        rs.getInt("chance"),
                        rs.getInt("continent"),
                        rs.getByte("dropType"),
                        rs.getInt("minimum_quantity"),
                        rs.getInt("maximum_quantity"),
                        rs.getInt("questid")));
            }
        } catch (SQLException e) {
            System.err.println("Error loading global drops: " + e);
        }
    }

    private void loadAllDrops() {
        Map<Integer, List<MonsterDropEntry>> tempDrops = new HashMap<>();
        MapleItemInformationProvider ii = MapleItemInformationProvider.getInstance();
        
        try (Connection con = DatabaseConnection.getConnection();
             PreparedStatement ps = con.prepareStatement("SELECT * FROM drop_data ORDER BY dropperid");
             ResultSet rs = ps.executeQuery()) {

            while (rs.next()) {
                int monsterId = rs.getInt("dropperid");
                int itemId = rs.getInt("itemid");
                
                // Validation: Skip invalid items
                if (itemId != 0 && !ii.itemExists(itemId)) {
                    continue;
                }

                int chance = rs.getInt("chance");
                if (GameConstants.getInventoryType(itemId) == MapleInventoryType.EQUIP) {
                    chance *= 10;
                }

                MonsterDropEntry entry = new MonsterDropEntry(
                        itemId,
                        chance,
                        rs.getInt("minimum_quantity"),
                        rs.getInt("maximum_quantity"),
                        rs.getInt("questid"));

                // Interning: share identical drop entries
                MonsterDropEntry shared = interner.get(entry);
                if (shared == null) {
                    interner.put(entry, entry);
                    shared = entry;
                }

                tempDrops.computeIfAbsent(monsterId, k -> new ArrayList<>()).add(shared);
            }

            // Post-processing: Add mesos if missing
            for (Map.Entry<Integer, List<MonsterDropEntry>> entry : tempDrops.entrySet()) {
                int monsterId = entry.getKey();
                List<MonsterDropEntry> mobDrops = entry.getValue();
                
                boolean hasMeso = false;
                for (MonsterDropEntry d : mobDrops) {
                    if (d.itemId == 0) {
                        hasMeso = true;
                        break;
                    }
                }
                
                if (!hasMeso) {
                    MapleMonsterStats stats = MapleLifeFactory.getMonsterStats(monsterId);
                    if (stats != null) {
                        addMeso(stats, mobDrops);
                    }
                }
                List<MonsterDropEntry> unmodifiableDrops = Collections.unmodifiableList(mobDrops);
                drops.put(monsterId, unmodifiableDrops);
                
                MapleMonsterStats stats = MapleLifeFactory.getMonsterStats(monsterId);
                if (stats != null) {
                    stats.setDrops(unmodifiableDrops);
                }
            }

        } catch (SQLException e) {
            System.err.println("Error loading all drops: " + e);
        }
    }

    public List<MonsterDropEntry> retrieveDrop(final int monsterId) {
        return drops.get(monsterId);
    }


    public void addExtra() {
        final MapleItemInformationProvider ii = MapleItemInformationProvider.getInstance();
        for (Entry<Integer, List<MonsterDropEntry>> e : drops.entrySet()) {
            List<MonsterDropEntry> mobDrops = new ArrayList<>(e.getValue());
            boolean modified = false;
            
            for (int i = 0; i < mobDrops.size(); i++) {
                if (mobDrops.get(i).itemId != 0 && !ii.itemExists(mobDrops.get(i).itemId)) {
                    mobDrops.remove(i);
                    i--;
                    modified = true;
                }
            }
            
            final MapleMonsterStats mons = MapleLifeFactory.getMonsterStats(e.getKey());
            if (mons != null) {
                Integer item = ii.getItemIdByMob(e.getKey());
                if (item != null && item.intValue() > 0) {
                    mobDrops.add(new MonsterDropEntry(item.intValue(), mons.isBoss() ? 1000000 : 10000, 1, 1, 0));
                    modified = true;
                }
                StructFamiliar f = ii.getFamiliarByMob(e.getKey().intValue());
                if (f != null) {
                    mobDrops.add(new MonsterDropEntry(f.itemid, mons.isBoss() ? 10000 : 100, 1, 1, 0));
                    modified = true;
                }
            }
            
            if (modified) {
                List<MonsterDropEntry> unmodifiableDrops = Collections.unmodifiableList(mobDrops);
                drops.put(e.getKey(), unmodifiableDrops);
                if (mons != null) {
                    mons.setDrops(unmodifiableDrops);
                }
            }
        }
        
        ii.getMonsterBook().forEach((mobId, itemId) -> {
            if (!drops.containsKey(mobId)) {
                final MapleMonsterStats mons = MapleLifeFactory.getMonsterStats(mobId);
                List<MonsterDropEntry> e = new ArrayList<>();
                e.add(new MonsterDropEntry(itemId, mons.isBoss() ? 1000000 : 10000, 1, 1, 0));
                StructFamiliar f = ii.getFamiliarByMob(mobId);
                if (f != null) {
                    e.add(new MonsterDropEntry(f.itemid, mons.isBoss() ? 10000 : 100, 1, 1, 0));
                }
                addMeso(mons, e);

                List<MonsterDropEntry> unmodifiableDrops = Collections.unmodifiableList(e);
                drops.put(mobId, unmodifiableDrops);
                if (mons != null) {
                    mons.setDrops(unmodifiableDrops);
                }
            }
        });
        for (StructFamiliar f : ii.getFamiliars().values()) {
            if (!drops.containsKey(f.mob)) {
                MapleMonsterStats mons = MapleLifeFactory.getMonsterStats(f.mob);
                List<MonsterDropEntry> e = new ArrayList<>();
                e.add(new MonsterDropEntry(f.itemid, mons.isBoss() ? 10000 : 100, 1, 1, 0));
                addMeso(mons, e);
                
                List<MonsterDropEntry> unmodifiableDrops = Collections.unmodifiableList(e);
                drops.put(f.mob, unmodifiableDrops);
                if (mons != null) {
                    mons.setDrops(unmodifiableDrops);
                }
            }
        }
        if (GameConstants.GMS) { 
            for (Entry<Integer, List<MonsterDropEntry>> e : drops.entrySet()) {
                if (e.getKey() != 9400408 && mobStringData.getChildByPath(String.valueOf(e.getKey())) != null) {
                    List<MonsterDropEntry> mobDrops = new ArrayList<>(e.getValue());
                    boolean modified = false;
                    for (MapleData d : mobStringData.getChildByPath(e.getKey() + "/reward")) {
                        final int toAdd = MapleDataTool.getInt(d, 0);
                        if (toAdd > 0 && !contains(mobDrops, toAdd) && ii.itemExists(toAdd)) {
                            mobDrops.add(new MonsterDropEntry(toAdd, chanceLogic(toAdd), 1, 1, 0));
                            modified = true;
                        }
                    }
                    if (modified) {
                        drops.put(e.getKey(), Collections.unmodifiableList(mobDrops));
                    }
                }
            }
        }
    }

    public void addMeso(MapleMonsterStats mons, List<MonsterDropEntry> ret) {
        final double divided = (mons.getLevel() < 100 ? (mons.getLevel() < 10 ? (double) mons.getLevel() : 10.0) : (mons.getLevel() / 10.0));
        final int max = mons.isBoss() && !mons.isPartyBonus() ? (mons.getLevel() * mons.getLevel()) : (mons.getLevel() * (int) Math.ceil(mons.getLevel() / divided));
        for (int i = 0; i < mons.dropsMeso(); i++) {
            ret.add(new MonsterDropEntry(0, mons.isBoss() && !mons.isPartyBonus() ? 1000000 : (mons.isPartyBonus() ? 100000 : 200000), (int) Math.floor(0.66 * max), max, 0));
        }
    }

    public void clearDrops() {
        reload();
    }

    public boolean contains(List<MonsterDropEntry> e, int toAdd) {
        for (MonsterDropEntry f : e) {
            if (f.itemId == toAdd) {
                return true;
            }
        }
        return false;
    }

    public String getCacheReport() {
        return String.format("MapleMonsterInformationProvider: %d monsters with drops, %d global drops\n", drops.size(), globaldrops.size());
    }

    public int chanceLogic(int itemId) { // Not much logic in here. most of the drops should already be there anyway.
        if (GameConstants.getInventoryType(itemId) == MapleInventoryType.EQUIP) {
            return 50000; // With *10
        } else if (GameConstants.getInventoryType(itemId) == MapleInventoryType.SETUP || GameConstants.getInventoryType(itemId) == MapleInventoryType.CASH) {
            return 500;
        } else {
            switch (itemId / 10000) {
                case 204:
                case 207:
                case 233:
                case 229:
                    return 500;
                case 401:
                case 402:
                    return 5000;
                case 403:
                    return 5000; // Lol
            }
            return 20000;
        }
    }
    //MESO DROP: level * (level / 10) = max, min = 0.66 * max
    //explosive Reward = 7 meso drops
    //boss, ffaloot = 2 meso drops
    //boss = level * level = max
    //no mesos if: mobid / 100000 == 97 or 95 or 93 or 91 or 90 or removeAfter > 0 or invincible or onlyNormalAttack or friendly or dropitemperiod > 0 or cp > 0 or point > 0 or fixeddamage > 0 or selfd > 0 or mobType != null and mobType.charat(0) == 7 or PDRate <= 0
}