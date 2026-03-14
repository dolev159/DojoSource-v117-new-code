/*
	名字:	隱藏地圖
	地圖:	蒙特鳩祕密之室
	描述:	261000011
*/

function enter(pi) {
	var map = pi.getSavedLocation("MULUNG_TC");
	if (map < 0) map = 261000010; //蒙特鳩協會

	pi.getPlayer().changeMap(pi.getMap(map), pi.getMap(map).getPortal(map == 261000010 ? 2 : 0));
	pi.clearSavedLocation("MULUNG_TC"); //刪除標記地圖
	return true;
}