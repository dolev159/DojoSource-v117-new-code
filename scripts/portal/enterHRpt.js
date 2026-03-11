/*
	名字:	玩具城
	地圖:	赫爾奧斯塔圖書館
	描述:	222020000
*/

function enter(pi) {
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(25432)).getStatus() == 1) {
		var em = pi.getEventManager("q25432");
		var prop = em.getProperty("state");
	if (prop == null || prop == 0) {
		em.startInstance(pi.getPlayer());
		return true;
		}
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "Try again soon."));
		return false;
		}
		pi.getClient().getSession().write(Packages.tools.packet.CWvsContext.serverNotice(5, "You cannot enter."));
		return false;
}