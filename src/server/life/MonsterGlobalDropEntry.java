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

public class MonsterGlobalDropEntry {

    public MonsterGlobalDropEntry(int itemId, int chance, int continent, byte dropType, int Minimum, int Maximum, int questid) {
        this.itemId = itemId;
        this.chance = chance;
        this.dropType = dropType;
        this.continent = continent;
        this.questid = questid;
        this.Minimum = Minimum;
        this.Maximum = Maximum;
    }

    public MonsterGlobalDropEntry(int itemId, int chance, int continent, byte dropType, int Minimum, int Maximum, int questid, boolean onlySelf) {
        this.itemId = itemId;
        this.chance = chance;
        this.dropType = dropType;
        this.continent = continent;
        this.questid = questid;
        this.Minimum = Minimum;
        this.Maximum = Maximum;
        this.onlySelf = onlySelf;
    }
    public byte dropType;
    public int itemId, chance, Minimum, Maximum, continent, questid;
    public boolean onlySelf = false;

    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (obj == null || getClass() != obj.getClass()) return false;
        MonsterGlobalDropEntry other = (MonsterGlobalDropEntry) obj;
        return itemId == other.itemId && chance == other.chance && 
               dropType == other.dropType && continent == other.continent && 
               questid == other.questid && Minimum == other.Minimum && 
               Maximum == other.Maximum && onlySelf == other.onlySelf;
    }

    @Override
    public int hashCode() {
        int hash = 3;
        hash = 97 * hash + dropType;
        hash = 97 * hash + itemId;
        hash = 97 * hash + chance;
        hash = 97 * hash + Minimum;
        hash = 97 * hash + Maximum;
        hash = 97 * hash + continent;
        hash = 97 * hash + questid;
        hash = 97 * hash + (onlySelf ? 1 : 0);
        return hash;
    }
}