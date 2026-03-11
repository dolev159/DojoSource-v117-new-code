/*
	名字:	小嘴
	地圖:	白色聖誕節之丘
	描述:	555000000
*/

function start() {
	cm.sendYesNo("Would you like to head back?");
}

function action(mode, type, selection) {
	if (mode > 0) {
		var map = cm.getPlayer().getSavedLocation(Packages.server.maps.SavedLocationType.fromString("CHRISTMAS"));
		if (map < 0) map = 103000000;

		cm.getPlayer().changeMap(cm.getMap(map), cm.getMap(map).getPortal(0));
		cm.getPlayer().clearSavedLocation(Packages.server.maps.SavedLocationType.fromString("CHRISTMAS"));
		}
		cm.dispose();
}