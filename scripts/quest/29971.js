/*
	名字:	幻影俠盜
	地圖:	幻影俠盜
	描述:	幻影俠盜
*/

function start(mode, type, selection) {
	Packages.server.quest.MapleQuest.getInstance(29971).forceComplete(qm.getPlayer(), qm.getNpc());
	qm.getClient().getSession().write(Packages.tools.packet.CWvsContext.getTopMsg("<Master Thief Phantom> has been rewarded."));
	qm.getClient().getSession().write(Packages.tools.packet.CWvsContext.serverNotice(5, "<Master Thief Phantom> has been rewarded."));
	qm.dispose();
}

function end(mode, type, selection) {
	qm.dispose();
}