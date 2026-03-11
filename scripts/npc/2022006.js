/*
	名字:	邪摩斯的口信
	地圖:	萬年冰河洞穴
	描述:	921120300
*/

function start() {
	cm.sendYesNo("Muahaha, are you running away? Do whatever you like, you're no longer useful.");
}

function action(mode, type, selection) {
	switch (mode) {
	case 0:
		cm.sendOk("Ha, don't you value your life?");
		break;
	case 1:
		cm.getPlayer().changeMap(cm.getMap(921120001), cm.getMap(921120001).getPortal(0));
		}
		cm.dispose();
}