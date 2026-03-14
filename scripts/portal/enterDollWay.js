/*
	名字:	詛咒之林
	地圖:	玩偶師的避難所
	描述:	101040311
*/

function enter(pi) {
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(21734)).getStatus() == 1) {
		var em = pi.getEventManager("q21734");
		var prop = em.getProperty("state");
	if (prop == null || prop == 0) {
		em.startInstance(pi.getPlayer());
		return false;
		}
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "This place looks really dark and damp... Maybe you should try later."));
		return false;
		}
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "It seems to be locked. You can't get in."));
		return false;
}