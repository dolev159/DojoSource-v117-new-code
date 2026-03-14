/*
	名字:	耶雷弗
	地圖:	騎士之殿
	描述:	915000300
*/

function enter(pi) {
	pi.startportalScript("PTtutor300_0");
	return true;
}

function start() {
	pi.sendNextS("This will be a cakewalk. I hope...", 17);
}

function action(mode, type, selection) {
	if (mode > 0)
		pi.dispose();
		pi.getPlayer().changeMap(pi.getMap(915000301), pi.getMap(915000301).getPortal(1)); //騎士之殿
}