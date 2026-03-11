/*
	名字:	神出鬼沒
	地圖:	神出鬼沒
	描述:	神出鬼沒
*/

function start(mode, type, selection) {
	Packages.server.quest.MapleQuest.getInstance(29968).forceComplete(qm.getPlayer(), qm.getNpc());
	qm.getClient().getSession().write(Packages.tools.packet.CWvsContext.getTopMsg("<Without a Trace> has been rewarded."));
	qm.getClient().getSession().write(Packages.tools.packet.CWvsContext.serverNotice(5, "<Without a Trace> has been rewarded."));
	qm.dispose();
}

function end(mode, type, selection) {
	qm.dispose();
}