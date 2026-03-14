/*
	名字:	隱藏地圖
	地圖:	鐵舖外部
	描述:	914021010
*/

function enter(pi) {
	pi.getPlayer().changeMap(pi.getMap(pi.getPlayer().getMap().getId() - 10), pi.getMap(pi.getPlayer().getMap().getId() - 10).getPortal(2)); //大將翁的鐵舖
	return true;
}