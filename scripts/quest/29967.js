/*
	名字:	曾經是英雄的人
	地圖:	曾經是英雄的人
	描述:	曾經是英雄的人
*/

function start(mode, type, selection) {
	Packages.server.quest.MapleQuest.getInstance(29967).forceComplete(qm.getPlayer(), qm.getNpc());
	qm.getClient().getSession().write(Packages.tools.packet.CWvsContext.getTopMsg("<A Hero, No More> has been rewarded."));
	qm.getClient().getSession().write(Packages.tools.packet.CWvsContext.serverNotice(5, "<A Hero, No More> has been rewarded."));
	qm.dispose();
}

function end(mode, type, selection) {
	qm.dispose();
}