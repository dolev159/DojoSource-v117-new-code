/*
	名字:	隱藏地圖
	地圖:	玩偶之家
	描述:	922010100
*/

function enter(pi) {
	var eim = pi.getPlayer().getEventInstance();
	if (eim.getProperty("stage1") == null) {
		return false;
		}
		pi.getPlayer().changeMap(pi.getMap(pi.getPlayer().getMap().getId() + 300), pi.getMap(pi.getPlayer().getMap().getId() + 300).getPortal(0));  //遺棄之塔&amp;lt;第2階段&gt;
		return true;
}