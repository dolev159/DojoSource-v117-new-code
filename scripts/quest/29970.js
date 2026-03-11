/*
	名字:	艾麗亞的朋友
	地圖:	艾麗亞的朋友
	描述:	艾麗亞的朋友
*/

function start(mode, type, selection) {
	Packages.server.quest.MapleQuest.getInstance(29970).forceComplete(qm.getPlayer(), qm.getNpc());
	qm.getClient().getSession().write(Packages.tools.packet.CWvsContext.getTopMsg("<The One Who Remembers> has been rewarded."));
	qm.getClient().getSession().write(Packages.tools.packet.CWvsContext.serverNotice(5, "<The One Who Remembers> has been rewarded."));
	qm.dispose();
}

function end(mode, type, selection) {
	qm.dispose();
}