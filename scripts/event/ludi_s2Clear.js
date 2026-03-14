/*
	名字:	隱藏地圖
	地圖:	遺棄之塔&amp;lt;第2階段&gt;
	描述:	922010400
*/

function enter(pi) {
	var eim = pi.getPlayer().getEventInstance();
	if (eim.getProperty("stage2") == null) {
		return false;
		}
		pi.getPlayer().changeMap(pi.getMap(pi.getPlayer().getMap().getId() + 200), pi.getMap(pi.getPlayer().getMap().getId() + 200).getPortal(0)); //遺棄之塔&amp;lt;第3階段&gt;
		return true;
}