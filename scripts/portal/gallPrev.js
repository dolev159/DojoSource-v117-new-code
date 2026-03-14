/*
	名字:	畫中的世界
	地圖:	埃德爾斯坦
	描述:	956010100
*/

function enter(pi) {
	map = pi.getPlayer().getMap().getId() == 956030400 ? 200 : 100;
	Portal = pi.getPlayer().getMap().getId() == 956030400 ? 3 : pi.getPlayer().getMap().getId() == 956010200 || pi.getPlayer().getMap().getId() == 956030200 ? 2 : 1;
	pi.getPlayer().changeMap(pi.getMap(pi.getPlayer().getMap().getId() - map), pi.getMap(pi.getPlayer().getMap().getId() - map).getPortal(Portal));
	return true;
}