/*
	名字:	疑問的飛行船
	地圖:	外部
	描述:	915000200
*/

function enter(pi) {
	pi.startportalScript("PTtutor200_0");
	return true;
}

function start() {
	pi.sendNextS("This portal leads straight into Ereve. The place is going to be positively crawling with knights. Sounds like just my kind of place.", 17);
}

function action(mode, type, selection) {
	if (mode > 0)
		pi.dispose();
		pi.getPlayer().changeMap(pi.getMap(915000300), pi.getMap(915000300).getPortal(1)); //騎士之殿
}