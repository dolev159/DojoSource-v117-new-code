/*
	名字:	過去的神木村
	地圖:	燃燒的廢墟
	描述:	272000310
*/

function enter(pi) {
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(31175)).getStatus() > 0 && pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(31176)).getStatus() < 2) {
		var em = pi.getEventManager("q31176");
		var prop = em.getProperty("state");
	if (prop == null || prop == 0) {
		em.startInstance(pi.getPlayer());
		return true;
		}
		pi.getClient().getSession().write(Packages.tools.packet.CWvsContext.serverNotice(5, "Try again soon."));
		return false;
		}
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(31173)).getStatus() == 1 || pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(31176)).getStatus() > 1) {
		pi.getPlayer().changeMap(pi.getMap(272000400), pi.getMap(272000400).getPortal(1)); //燃燒的神木村4
		return true;
		}
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(31172)).getStatus() < 2) {
		pi.getClient().getSession().write(Packages.tools.packet.CField.NPCPacket.getNPCTalk(2144006, 0, "Would you take a moment to talk to me before you leave? I have a favor to ask.", "00 00", 0));
		}
		return true;
}