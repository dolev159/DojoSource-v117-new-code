/*
This file is part of the ZeroFusion MapleStory Server
Copyright (C) 2008 Patrick Huy <patrick.huy@frz.cc> 
Matthias Butz <matze@odinms.de>
Jan Christian Meyer <vimes@odinms.de>
ZeroFusion organized by "RMZero213" <RMZero213@hotmail.com>

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
package client.inventory;

import java.sql.Connection;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;
import database.DatabaseConnection;
import tools.Pair;

public enum ItemLoader {

    INVENTORY("inventoryitems", "inventoryequipment", 0, "characterid"),
    STORAGE("inventoryitems", "inventoryequipment", 1, "accountid"),
    CASHSHOP("csitems", "csequipment", 2, "accountid"),
    HIRED_MERCHANT("hiredmerchitems", "hiredmerchequipment", 5, "packageid"),
    DUEY("dueyitems", "dueyequipment", 6, "packageid"),
    MTS("mtsitems", "mtsequipment", 8, "packageid"),
    MTS_TRANSFER("mtstransfer", "mtstransferequipment", 9, "characterid");
    private int value;
    private String table, table_equip, arg;

    private ItemLoader(String table, String table_equip, int value, String arg) {
        this.table = table;
        this.table_equip = table_equip;
        this.value = value;
        this.arg = arg;
    }

    public int getValue() {
        return value;
    }

    public Map<Long, Pair<Item, MapleInventoryType>> loadItems(boolean login, int id) throws SQLException {
        try (Connection con = DatabaseConnection.getConnection()) {
            return loadItems(con, id, login);
        }
    }

    public Map<Long, Pair<Item, MapleInventoryType>> loadItems(Connection con, int id, boolean login) throws SQLException {
        return database.ItemDAO.loadItems(con, id, login, table, table_equip, arg, value);
    }

    public void saveItems(List<Pair<Item, MapleInventoryType>> items, int id) throws SQLException {
        try (Connection con = DatabaseConnection.getConnection()) {
            saveItems(items, con, id);
        }
    }

    public void saveItems(List<Pair<Item, MapleInventoryType>> items, final Connection con, int id) throws SQLException {
        database.ItemDAO.saveItems(con, items, id, table, table_equip, arg, value);
    }
}