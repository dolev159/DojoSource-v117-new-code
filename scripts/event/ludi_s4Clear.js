/*
	名字:	隱藏地圖
	地圖:	遺棄之塔&amp;lt;第4階段&gt;
	描述:	922010700
*/

function enter(pi) {
	var eim = pi.getPlayer().getEventInstance();
	if (eim.getProperty("stage4") == null) {
		return false;
		}
		pi.getPlayer().changeMap(pi.getMap(pi.getPlayer().getMap().getId() + 100), pi.getMap(pi.getPlayer().getMap().getId() + 100).getPortal(0)); //遺棄之塔&amp;lt;第5階段&gt;
		return true;
}