/*
	名字:	玩具城
	地圖:	愛奧斯塔101樓
	描述:	221023300
*/

function enter(pi) {
	var map = pi.getPlayer().getSavedLocation(Packages.server.maps.SavedLocationType.fromString("MULUNG_TC"));
	if (map < 0) map = 221023200; //愛奧斯塔100樓

	pi.getPlayer().changeMap(pi.getMap(map), pi.getMap(map).getPortal(map == 221023200 ? 1 : 0));
	pi.getPlayer().clearSavedLocation(Packages.server.maps.SavedLocationType.fromString("MULUNG_TC"));
	return true;
}