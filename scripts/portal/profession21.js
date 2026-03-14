/*
	名字:	新葉城 市區街道
	地圖:	新葉城-市區中心
	描述:	600000000
*/

function enter(pi) {
	pi.getPlayer().saveLocation(Packages.server.maps.SavedLocationType.fromString("ARDENTMILL"));
	pi.getPlayer().changeMap(pi.getMap(910001000), pi.getMap(910001000).getPortal(6));
	return true;
}