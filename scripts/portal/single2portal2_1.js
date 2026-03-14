/*
	名字:	畫中的世界
	地圖:	小綠洲
	描述:	956020200
*/

function enter(pi) {
	pi.getPlayer().changeMap(pi.getMap(pi.getPlayer().getMap().getId() - 200), pi.getMap(pi.getPlayer().getMap().getId() - 200).getPortal(2));
	return true;
}