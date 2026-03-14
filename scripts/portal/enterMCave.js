/*
	名字:	瑞恩島
	地圖:	鏡子洞窟
	描述:	140030000
*/

function enter(pi) {
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(21201)).getStatus() > 0 && pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(21202)).getStatus() < 2) {
		var em = pi.getEventManager("q21201");
		var prop = em.getProperty("state");
	if (prop == null || prop == 0) {
		Packages.server.quest.MapleQuest.getInstance(21203).forceStart(pi.getPlayer(), 0, 0); //給予接取21202任務條件
		em.startInstance(pi.getPlayer());
		return false;
		}
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "You have so many thoughts swirling through your mind that the mirror won't show you what you want. You should try again later or move to a different channel."));
		return false;
		}
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(21302)).getStatus() > 0 && pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(21303)).getStatus() < 2) {
		var em = pi.getEventManager("q21302");
		var prop = em.getProperty("state");
	if (prop == null || prop == 0) {
		Packages.server.quest.MapleQuest.getInstance(21203).forceStart(pi.getPlayer(), 0, 1); //給予接取21303任務條件
		em.startInstance(pi.getPlayer());
		return false;
		}
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "You have so many thoughts swirling through your mind that the mirror won't show you what you want. You should try again later."));
		}
		return false;
}