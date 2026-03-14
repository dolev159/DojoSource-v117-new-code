/*
	名字:	黑路
	地圖:	避難準備完畢
	描述:	914000500
*/

function enter(pi) {
	pi.getPlayer().changeMap(pi.getMap(914000420), pi.getMap(914000420).getPortal(1)); //燃燒的森林1
	return true;
}