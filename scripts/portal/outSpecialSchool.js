/*
	名字:	隱藏地圖
	地圖:	武陵道場特別樓
	描述:	925040001
*/

function enter(pi) {
	pi.getPlayer().changeMap(pi.getMap(925040000), pi.getMap(925040000).getPortal(1)); //武陵道場後路
	return true;
}