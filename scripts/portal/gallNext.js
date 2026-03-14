/*
	名字:	畫中的世界
	地圖:	埃德爾斯坦
	描述:	956010100
*/

function enter(pi) {
	Portal = pi.getPlayer().getMap().getId() == 956010000 ? 3 : pi.getPlayer().getMap().getId() == 956010300 || pi.getPlayer().getMap().getId() == 956030000 || pi.getPlayer().getMap().getId() == 956030200 ? 1 : 2;
	pi.getPlayer().changeMap(pi.getMap(pi.getPlayer().getMap().getId() + 100), pi.getMap(pi.getPlayer().getMap().getId() + 100).getPortal(Portal));
	return true;
}