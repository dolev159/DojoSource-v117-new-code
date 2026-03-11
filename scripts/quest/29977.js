/*
	名字:	稱號 - 見習聖殿騎士
	地圖:	稱號 - 見習聖殿騎士
	描述:	稱號 - 見習聖殿騎士
*/

function start(mode, type, selection) {
	Packages.server.quest.MapleQuest.getInstance(29977).forceComplete(qm.getPlayer(), qm.getNpc());
	qm.getClient().getSession().write(Packages.tools.packet.CWvsContext.getTopMsg("<Apprentice Knight of Light> has been rewarded."));
	qm.getClient().getSession().write(Packages.tools.packet.CWvsContext.serverNotice(5, "<Apprentice Knight of Light> has been rewarded."));
	qm.dispose();
}

function end(mode, type, selection) {
	qm.dispose();
}