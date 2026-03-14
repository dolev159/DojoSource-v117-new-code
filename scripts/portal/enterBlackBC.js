/*
	名字:	玩具城
	地圖:	天空露臺&amp;lt;5&gt;
	描述:	220011000
*/

function enter(pi) {
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(22583)).getStatus() == 1) {
		var em = pi.getEventManager("q22583");
		var prop = em.getProperty("state");
	if (prop == null || prop == 0) {
		em.startInstance(pi.getPlayer());
		return false;
		}
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "Someone seems to be on the terrace. Try again later."));
		return false;
		}
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(22584)).getStatus() == 1) {
		var em = pi.getEventManager("q22584");
		var prop = em.getProperty("state");
	if (prop == null || prop == 0) {
		em.startInstance(pi.getPlayer());
		return false;
		}
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "Someone seems to be on the terrace. Try again later."));
		return false;
		}
		pi.getPlayer().changeMap(pi.getMap(220011001), pi.getMap(220011001).getPortal(1)); //天空陽台
		return true;
}