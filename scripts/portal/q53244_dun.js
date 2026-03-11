/*
	名字:	日落之路
	地圖:	睡夢沙漠
	描述:	260020620
*/

function enter(pi) {
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(53244)).getStatus() != 1) {
		return false;
		}
		pi.startportalScript("q53244_dun");
		return true;
}

function start() {
	pi.sendNextS("lf the #bMatter Disassembler#k really works on the core, I could be in for some trouble. I oughtta just toss this thing out here in the desert rather than risk it falling into the wrong hands.", 16);
}

function action(mode, type, selection) {
	if (mode > 0)
		pi.dispose();
		pi.getPlayer().changeMap(pi.getMap(552000070), pi.getMap(552000070).getPortal(0));
}