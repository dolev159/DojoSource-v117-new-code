/*
	名字:	時空門
	地圖:	維多利亞
	描述:	102040600
*/

var quest = [1608, 1620, 1621, 1623, 1625, 1627, 1628, 1629, 1631, 1632, 1632, 1634, 1655, 1657, 1658, 1660, 1662, 1666, 1668, 1670, 1671, 1672];

var map = [102040600, 220040200, 221040400, 260010201, 250020300, 261020500, 251010500, 251010500, 240010200, 240010600, 240010500, 240020200, 261020200, 240020401, 240020101, 220080000, 211041400, 230040410, 240040400, 270010500, 270020500, 270030500];

var tomap = [931050410, 931050413, 931050414, 931050415, 931050416, 931050417, 931050417, 931050418, 931050419, 931050420, 931050421, 931050422, 931050424, 931050425, 931050426, 931050427, 931050428, 931050429, 931050430, 931050431, 931050432, 931050433];

function start() {
	for (var i = 0; i < map.length; i ++)
	if (cm.getPlayer().getMap().getId() == map[i]) {
		q = i + (cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(1628)).getStatus() == 1 ? 1 : 0);
		}
	if (cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(quest[q])).getStatus() != 1) {
		cm.dispose();
		return;
		}
		cm.sendYesNo("The Mystic Gate beckons to you. Will you enter?");
}

function action(mode, type, selection) {
	if (mode > 0) {
		if (cm.getMap(tomap[q]).getCharacters().size() > 0) {
			cm.sendOk("You cannot enter the Mystic Gate right now. Please try again later.");
			cm.dispose();
			return;
			}
			cm.getMap(tomap[q]).resetFully();
			cm.getPlayer().changeMap(cm.getMap(tomap[q]), cm.getMap(tomap[q]).getPortal(0));
			cm.getPlayer().startMapTimeLimitTask(420, cm.getMap(map[q]));
			}
			cm.dispose();
}