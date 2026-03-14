/*
	名字:	畫中的世界
	地圖:	宮殿後走廊
	描述:	956020000
*/

function enter(pi) {
	pi.getPlayer().changeMap(pi.getMap(pi.getPlayer().getMap().getId() + 100), pi.getMap(pi.getPlayer().getMap().getId() + 100).getPortal(1));
	return true;
}