/*
	名字:	敢死隊的暗號石版
	地圖:	洞穴入口
	描述:	240050000
*/

function start() {
	if (cm.getPlayer().itemQuantity(4001086) < 1) {
		cm.sendOk("You can't read the words on the slate. You have no idea where to use it.");
		cm.dispose();
		return;
		}
		cm.sendYesNo("The letters on the slate glitter and the backdoor opens. Do you want to go to the secret path?");
}

function action(mode, type, selection) {
	switch (mode) {
	case 0:
		cm.sendNext("If you want to move, talk to me again.");
		break;
	case 1:
		cm.getPlayer().changeMap(cm.getMap(240050400), cm.getMap(240050400).getPortal(1));
		}
		cm.dispose();
}