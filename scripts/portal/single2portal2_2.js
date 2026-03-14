/*
	名字:	畫中的世界
	地圖:	小綠洲
	描述:	956020200
*/

function enter(pi) {
	pi.getPlayer().changeMap(pi.getMap(pi.getPlayer().getMap().getId() + 100), pi.getMap(pi.getPlayer().getMap().getId() + 100).getPortal(1));
	return true;
}