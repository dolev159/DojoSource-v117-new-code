/*
	名字:	雷本礦山
	地圖:	發電廠保安隊
	描述:	310050100
*/

function enter(pi) {
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(23033)).getStatus() == 1 || pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(23034)).getStatus() == 1 || pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(23035)).getStatus() == 1) {
	if (pi.getMap(931000200).getCharacters().size() < 1) {
		pi.getMap(931000200).resetFully();
		pi.getPlayer().changeMap(pi.getMap(931000200), pi.getMap(931000200).getPortal(1)); //3次轉職
		pi.getClient().getSession().write(Packages.tools.packet.CWvsContext.serverNotice(5, "Destroy the Energy Conducting Device!"));
		pi.getPlayer().startMapTimeLimitTask(600, pi.getMap(310050100));
		return true;
		}
		pi.getClient().getSession().write(Packages.tools.packet.CWvsContext.serverNotice(5, "You hear someone inside the Power Plant. Come back when no one is inside."));
		return false;
		}
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(24090)).getStatus() == 1) {
		var em = pi.getEventManager("q24090");
		var prop = em.getProperty("state");
	if (prop == null || prop == 0) {
		em.startInstance(pi.getPlayer());
		return false;
		}
		pi.getClient().getSession().write(Packages.tools.packet.CWvsContext.serverNotice(5, "This field has already been taken by someone. Please try again later, or try a different channel."));
		return false;
		}
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(25439)).getStatus() > 0 && pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(25440)).getStatus() < 2) {
	if (pi.getMap(931040200).getCharacters().size() < 1 && pi.getMap(931040201).getCharacters().size() < 1 && pi.getMap(931040202).getCharacters().size() < 1 ) {
		pi.getPlayer().changeMap(pi.getMap(931040200), pi.getMap(931040200).getPortal(1)); //發電所
		return true;
		}
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "Try again soon."));
		return false;
		}
		pi.getClient().getSession().write(Packages.tools.packet.CWvsContext.serverNotice(5, "It's a Power Plant. It's probably not a good idea to go inside."));
		return false;
}