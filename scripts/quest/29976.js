/*
	名字:	稱號 - 新生的光
	地圖:	稱號 - 新生的光
	描述:	稱號 - 新生的光
*/

function start(mode, type, selection) {
	Packages.server.quest.MapleQuest.getInstance(29976).forceComplete(qm.getPlayer(), qm.getNpc());
	qm.getClient().getSession().write(Packages.tools.packet.CWvsContext.getTopMsg("<Newborn Light> has been rewarded."));
	qm.getClient().getSession().write(Packages.tools.packet.CWvsContext.serverNotice(5, "<Newborn Light> has been rewarded."));
	qm.dispose();
}

function end(mode, type, selection) {
	qm.dispose();
}