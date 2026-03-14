/*
	名字:	隱藏地圖
	地圖:	騎士的平原
	描述:	921110000
*/

function enter(pi) {
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(21610)).getStatus() > 0 && pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(21619)).getStatus() < 1) {
		Packages.server.quest.MapleQuest.getInstance(21619).forceStart(pi.getPlayer(), 0, 0);
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "The Rider's Field has been cleared. Head to Scadur."));
		}
		return false;
}