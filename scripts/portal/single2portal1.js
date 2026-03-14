/*
	名字:	畫中的世界
	地圖:	納希宮殿&amp;lt;國王房間&gt;
	描述:	956020100
*/

function enter(pi) {
	pi.getPlayer().changeMap(pi.getMap(pi.getPlayer().getMap().getId() - 100), pi.getMap(pi.getPlayer().getMap().getId() - 100).getPortal(1));
	return true;
}