/*
	名字:	小嘴
	地圖:	墮落城市
	描述:	103000000
*/

function start() {
	cm.sendYesNo("Do you want to go to White Christmas HilI?");
}

function action(mode, type, selection) {
	if (mode > 0) {
		cm.getPlayer().saveLocation(Packages.server.maps.SavedLocationType.fromString("CHRISTMAS"));
		cm.getPlayer().changeMap(cm.getMap(555000000), cm.getMap(555000000).getPortal(0));
		}
		cm.dispose();
}