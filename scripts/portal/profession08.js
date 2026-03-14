/*
	名字:	米納爾森林
	地圖:	神木村
	描述:	240000000
*/

function enter(pi) {
	pi.getPlayer().saveLocation(Packages.server.maps.SavedLocationType.fromString("ARDENTMILL"));
	pi.getPlayer().changeMap(pi.getMap(910001000), pi.getMap(910001000).getPortal(6));
	return true;
}