/*
	名字:	楓之谷管理者
	地圖:	碼頭快速移動
	描述:	碼頭快速移動
*/

var map = [100000000, 101000000, 102000000, 103000000, 104000000, 120000100, 200000000, 211000000, 220000000, 221000000, 222000000, 230000000, 240000000, 250000000, 251000000, 260000000, 261000000, 310000000];

var tomap = [104020100, 104020100, 104020100, 104020100, 104020100, 104020100, 200000100, 200000100, 220000100, 220000100, 220000100, 200000100, 240000100, 250000100, 251000100, 260000100, 260000100, 310000010];

function start() {
	for (var i = 0; i < map.length; i++)
	if (cm.getPlayer().getMap().getId() == map[i]) {
		y = tomap[i];
		}
		cm.sendYesNoS("The closest continental station to your location is #m" + y + "#. Would you like to move to #b#m" + y + "##k?", 4);
}

function action(mode, type, selection) {
	if (mode > 0)
		cm.getPlayer().changeMap(cm.getMap(y), cm.getMap(y).getPortal(0));
		cm.dispose();
}