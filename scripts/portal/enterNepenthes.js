/*
	名字:	天空之城
	地圖:	散步路Ⅱ
	描述:	200060000
*/

function enter(pi) {
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(21737)).getStatus() == 1) {
		pi.getPlayer().changeMap(pi.getMap(200060001), pi.getMap(200060001).getPortal(2)); //人少的散步道
		return true;
		}
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(21739)).getStatus() == 1) {
		var em = pi.getEventManager("SealStone");
		var prop = em.getProperty("state");
	if (prop == null || prop == 0) {
		em.startInstance(pi.getPlayer());
		return false;
		}
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "Cannot enter the Neglected Strolling Path. Try again a little later."));
		return false;
		}
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "Cannot enter the premise without a purpose."));
		return false;
}