/*
	名字:	勇士之村
	地圖:	勇士之村
	描述:	102000000
*/

function enter(pi) {
	pi.getPlayer().saveLocation(Packages.server.maps.SavedLocationType.fromString("ARDENTMILL"));
	pi.getPlayer().changeMap(pi.getMap(910001000), pi.getMap(910001000).getPortal(6));
	return true;
}