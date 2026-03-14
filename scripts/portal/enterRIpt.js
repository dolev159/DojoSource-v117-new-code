/*
	名字:	瑞恩島
	地圖:	雪平原1
	描述:	140020000
*/

function enter(pi) {
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(25426)).getStatus() > 0 && pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(25427)).getStatus() < 1) {
		var em = pi.getEventManager("q25426");
		var prop = em.getProperty("state");
	if (prop == null || prop == 0) {
		em.startInstance(pi.getPlayer());
		return true;
		}
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "Try again soon."));
		return false;
		}
		pi.getPlayer().changeMap(pi.getMap(140000000), pi.getMap(140000000).getPortal(8)); //瑞恩村
		return true;
}