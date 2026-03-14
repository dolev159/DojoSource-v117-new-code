/*
	名字:	畫中的世界
	地圖:	峽谷入口
	描述:	956040500
*/

function enter(pi) {
	pi.getPlayer().changeMap(pi.getMap(pi.getPlayer().getMap().getId() - 100), pi.getMap(pi.getPlayer().getMap().getId() - 100).getPortal(1));
	return true;
}