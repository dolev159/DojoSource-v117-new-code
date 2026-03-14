/*
	名字:	隱藏地圖
	地圖:	與瑪哈的對決
	描述:	914020000
*/

function enter(pi) {
	pi.getPlayer().changeMap(pi.getMap(140000000), pi.getMap(140000000).getPortal(2)); //瑞恩村
	return true;
}