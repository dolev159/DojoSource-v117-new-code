/*
	名字:	隱藏地圖
	地圖:	畫廊入口
	描述:	956000100
*/

function enter(pi) {
	var map = pi.getPlayer().getSavedLocation(Packages.server.maps.SavedLocationType.fromString("MULUNG_TC"));
	if (map < 0) map = 100000000; //弓箭手村

	portal = pi.getMap(map).getPortal("unityPortal2") != null ? "unityPortal2" : 0;
	pi.getPlayer().changeMap(pi.getMap(map), pi.getMap(map).getPortal(portal));
	pi.getPlayer().clearSavedLocation(Packages.server.maps.SavedLocationType.fromString("MULUNG_TC"));
	return true;
}