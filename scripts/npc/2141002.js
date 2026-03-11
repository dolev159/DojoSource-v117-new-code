/*
	名字:	被遺忘的神殿管理人
	地圖:	神祇的黃昏
	描述:	270050100
*/

function start() {
	cm.sendYesNo("Would you like to stop the battle and leave?");
}

function action(mode, type, selection) {
	switch (mode) {
	case 0:
		cm.sendNext("Please keep trying.");
		break;
	case 1:
		cm.getPlayer().changeMap(cm.getMap(270050000), cm.getMap(270050000).getPortal(0));
		}
		cm.dispose();
}