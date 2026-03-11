/*
	名字:	楓之島
	地圖:	小菇菇
	描述:	10000
*/

function start() {
	if (!cm.getPlayer().getMap().containsNPC(2060102)) {
		cm.getPlayer().getMap().spawnNpc(2060102, new java.awt.Point(-225, 485));
		}
		cm.sendYesNo("Would you like to skip the tutorials and head straight to Lith Harbor?");
}

function action(mode, type, selection) {
	switch (mode) {
	case 0:
		cm.sendNext("Enjoy your trip.");
		break;
	case 1:
		cm.getPlayer().changeMap(cm.getMap(104000000), cm.getMap(104000000).getPortal(0));
		while (cm.getPlayer().getLevel() < 7) {
			cm.getPlayer().levelUp();
			}
			}
			cm.dispose();
}