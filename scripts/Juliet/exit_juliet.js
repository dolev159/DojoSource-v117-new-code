/*
	名字:	隱藏地圖
	地圖:	卡帕萊特祕密之室
	描述:	261000021
*/

function enter(pi) {
	var map = pi.getPlayer().getSavedLocation(Packages.server.maps.SavedLocationType.fromString("MULUNG_TC"));
	if (map < 0) map = 261000020; //卡帕萊特協會

	pi.getPlayer().changeMap(pi.getMap(map), pi.getMap(map).getPortal(map == 261000020 ? 2 : 0));
	pi.getPlayer().clearSavedLocation(Packages.server.maps.SavedLocationType.fromString("MULUNG_TC"));
	return true;
}