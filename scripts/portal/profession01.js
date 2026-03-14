/*
	名字:	弓箭手村
	地圖:	弓箭手村
	描述:	100000000
*/

function enter(pi) {
	pi.getPlayer().saveLocation(Packages.server.maps.SavedLocationType.fromString("ARDENTMILL"));
	pi.getPlayer().changeMap(pi.getMap(910001000), pi.getMap(910001000).getPortal(6));
	return true;
}