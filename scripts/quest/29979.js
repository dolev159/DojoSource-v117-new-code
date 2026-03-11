/*
	名字:	稱號 - 聖殿騎士團長
	地圖:	稱號 - 聖殿騎士團長
	描述:	稱號 - 聖殿騎士團長
*/

function start(mode, type, selection) {
	Packages.server.quest.MapleQuest.getInstance(29979).forceComplete(qm.getPlayer(), qm.getNpc());
	qm.getClient().getSession().write(Packages.tools.packet.CWvsContext.getTopMsg("<Chief Knight of Light> has been rewarded."));
	qm.getClient().getSession().write(Packages.tools.packet.CWvsContext.serverNotice(5, "<Chief Knight of Light> has been rewarded."));
	qm.dispose();
}

function end(mode, type, selection) {
	qm.dispose();
}