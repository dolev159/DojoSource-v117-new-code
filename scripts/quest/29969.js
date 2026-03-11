/*
	名字:	怪盜雷本的弟子
	地圖:	怪盜雷本的弟子
	描述:	怪盜雷本的弟子
*/

function start(mode, type, selection) {
	Packages.server.quest.MapleQuest.getInstance(29969).forceComplete(qm.getPlayer(), qm.getNpc());
	qm.getClient().getSession().write(Packages.tools.packet.CWvsContext.getTopMsg("<The Mind of the Raven> has been rewarded."));
	qm.getClient().getSession().write(Packages.tools.packet.CWvsContext.serverNotice(5, "<The Mind of the Raven> has been rewarded."));
	qm.dispose();
}

function end(mode, type, selection) {
	qm.dispose();
}