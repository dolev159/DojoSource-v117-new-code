/*
	名字:	超級美女
	地圖:	埃德爾斯坦
	描述:	310000000
*/

function start() {
	cm.sendNext("What's the hold up!? Go to school already!");
}

function action(mode, type, selection) {
	if (mode > 0)
		cm.getPlayer().saveLocation(Packages.server.maps.SavedLocationType.fromString("MULUNG_TC"));
		cm.getPlayer().changeMap(cm.getMap(744000000), cm.getMap(744000000).getPortal(2));
		cm.dispose();
}