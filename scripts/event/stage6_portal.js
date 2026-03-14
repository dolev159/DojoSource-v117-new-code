/*
	名字:	隱藏地圖
	地圖:	遺棄之塔&amp;lt;第3階段&gt;
	描述:	922010600
*/

function enter(pi) {
	pi.warpMap(pi.getPlayer().getMap().getId() + 100, 0);
	return true;
}