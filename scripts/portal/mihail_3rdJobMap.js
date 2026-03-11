/*
	名字:	隱藏地圖
	地圖:	那因哈特的考場
	描述:	913070200
*/

function enter(pi) {
	pi.getPlayer().changeMap(pi.getMap(130000000), pi.getMap(130000000).getPortal(0));
	return true;
}