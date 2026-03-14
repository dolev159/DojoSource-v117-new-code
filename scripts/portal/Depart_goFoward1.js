/*
	名字:	福爾摩沙
	地圖:	7層8層 B區域
	描述:	103040410
*/

function enter(pi) {
	pi.getPlayer().changeMap(pi.getMap(pi.getPlayer().getMap().getId() + 10), pi.getMap(pi.getPlayer().getMap().getId() + 10).getPortal(pi.getMap(pi.getPlayer().getMap().getId() + 10).getPortal(2) != null ? 2 : 1));
	return true;
}