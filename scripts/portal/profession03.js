/*
	名字:	艾納斯大陸
	地圖:	冰原雪域市集
	描述:	211000100
*/

function enter(pi) {
	pi.getPlayer().saveLocation(Packages.server.maps.SavedLocationType.fromString("ARDENTMILL"));
	pi.getPlayer().changeMap(pi.getMap(910001000), pi.getMap(910001000).getPortal(6));
	return true;
}