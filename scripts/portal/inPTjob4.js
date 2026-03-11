/*
	名字:	隱密之地
	地圖:	茂密的森林
	描述:	240010102
*/

function enter(pi) {
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(25121)).getStatus() > 0) {
		var em = pi.getEventManager("q25121");
		var prop = em.getProperty("state");
	if (prop == null || prop == 0) {
		em.startInstance(pi.getPlayer());
		return true;
		}
		pi.getClient().getSession().write(Packages.tools.packet.CWvsContext.serverNotice(5, "Someone is already using this field. Wait or try another channel."));
		return false;
		}
		pi.getClient().getSession().write(Packages.tools.packet.CWvsContext.serverNotice(5, "You see a strange door. It may be dangerous."));
		return true;
}