/*
	名字:	隱藏的街道
	地圖:	甜蜜蛋糕山丘
	描述:	683000100
*/

function enter(pi) {
	pi.getPlayer().changeMap(pi.getMap(683000000), pi.getMap(683000000).getPortal(Math.floor(pi.getPlayer().getMap().getId() / 10 % 10) + 4)); //甜蜜蛋糕山丘入口
	return true;
}