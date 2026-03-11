/*
	名字:	Aldpl
	地圖:	夢幻主題公園
	描述:	551030200
*/

function start() {
	cm.sendYesNo("Are you sure you want to leave this Place? I can take you to the safe place..");
}

function action(mode, type, selection) {
	if (mode > 0)
		cm.getPlayer().changeMap(cm.getMap(551030100), cm.getMap(551030100).getPortal(0));
		cm.dispose();
}