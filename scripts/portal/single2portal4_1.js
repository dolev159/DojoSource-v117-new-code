/*
	名字:	畫中的世界
	地圖:	紅色沙漠
	描述:	956020400
*/

function enter(pi) {
	pi.getPlayer().changeMap(pi.getMap(pi.getPlayer().getMap().getId() - 100), pi.getMap(pi.getPlayer().getMap().getId() - 100).getPortal(2));
	return true;
}