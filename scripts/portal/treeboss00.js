/*
	名字:	新加坡
	地圖:	克雷塞爾遺跡 I
	描述:	541020700
*/

function enter(pi) {
	var em = pi.getEventManager("Krexel");
	var prop = em.getProperty("state");
	if (prop == null || prop == 0) {
	if (pi.getPlayer().getParty() == null) {
		em.startInstance(pi.getPlayer());
		return true;
		}
	if (pi.getPlayer().getParty().getLeader().getId() != pi.getPlayer().getId()) {
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "Only party leaders can initiate entry."));
		return false;
		}
		em.startInstance(pi.getPlayer().getParty(), pi.getPlayer().getMap(), 200);
		return true;
		}
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "Another party is already inside."));
		return false;
}