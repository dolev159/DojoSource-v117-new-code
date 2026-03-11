/*
	名字:	潘喜
	地圖:	潘喜的測試空間1
	描述:	910100110
*/

function start() {
	cm.sendYesNo("Myou want to leave?");
}

function action(mode, type, selection) {
	if (mode > 0)
		cm.getPlayer().changeMap(cm.getMap(101030000), cm.getMap(101030000).getPortal(0));
		cm.dispose();
}