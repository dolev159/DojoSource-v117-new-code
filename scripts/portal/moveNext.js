/*
	名字:	隱藏地圖
	地圖:	大將翁的鐵舖
	描述:	914021000
*/

function enter(pi) {
	pi.getPlayer().changeMap(pi.getMap(pi.getPlayer().getMap().getId() + 10), pi.getMap(pi.getPlayer().getMap().getId() + 10).getPortal(1)); //鐵舖外部
	return true;
}