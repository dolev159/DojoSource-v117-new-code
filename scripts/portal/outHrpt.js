/*
	名字:	玩具城
	地圖:	圖書館倉庫
	描述:	922030200
*/

function enter(pi) {
	pi.getPlayer().changeMap(pi.getMap(922030201), pi.getMap(922030201).getPortal(0)); //赫爾奧斯塔圖書館
	return true;
}