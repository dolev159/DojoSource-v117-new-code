/*
	名字:	凱雷特
	地圖:	測試房間
	描述:	931050510
*/

function start() {
	cm.sendYesNoS("Do you want to leave?", 4);
}

function action(mode, type, selection) {
	switch (mode) {
	case 0:
		cm.sendNextS("Excellent choice! Pass this test, and you will be a member of the silent Crusade.", 4);
		break;
	case 1:
		cm.getPlayer().changeMap(cm.getMap(931050500), cm.getMap(931050500).getPortal(0));
		}
		cm.dispose();
}