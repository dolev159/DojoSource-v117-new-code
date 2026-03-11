/*
	名字:	樹根水晶
	地圖:	闇黑龍王洞穴入口
	描述:	240050400
*/

function start() {
	cm.sendYesNo(cm.getPlayer().getMap().getId() == 240050400 ? "Do you want to return to #m240050000#?" : "Do you want to give up squad and quit?");
}

function action(mode, type, selection) {
	switch (mode) {
	case 0:
		cm.sendOk(cm.getPlayer().getMap().getId() == 240050400 ? "Think it over and talk to me again." : "Think again and talk to me.");
		break;
	case 1:
		cm.getPlayer().changeMap(cm.getMap(240050000), cm.getMap(240050000).getPortal(0));
		}
		cm.dispose();
}