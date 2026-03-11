/*
	名字:	洞穴入口
	地圖:	岩石山洞穴
	描述:	300010410
*/

function start() {
	cm.sendYesNoS("What, you're quitting now?", 4);
}

function action(mode, type, selection) {
	switch (mode) {
	case 0:
		cm.sendOkS("Good thinking. Get rid of Chao!", 4);
		break;
	case 1:
		cm.getPlayer().changeMap(cm.getMap(300010400), cm.getMap(300010400).getPortal(2));
		}
		cm.dispose();
}