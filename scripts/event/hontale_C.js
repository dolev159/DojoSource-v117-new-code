/*
	名字:	生命之穴
	地圖:	抉擇洞穴
	描述:	240050200
*/

function enter(pi) {
	if (pi.getPlayer().getMap().getReactorByName("light").getState() == 1) {
	if (pi.getPlayer().getParty().getLeader().getId() != pi.getPlayer().getId()) {
		pi.getClient().getSession().write(Packages.tools.packet.CWvsContext.serverNotice(5, "The party leader can decide the direction."));
		return false;
		}
		pi.getPlayer().getMap().broadcastMessage(Packages.tools.packet.CWvsContext.serverNotice(6, "You are moved to the cave of light."));
		pi.warpMap(240050300, 0); //光明洞穴
		return true;
		}
	if (pi.getPlayer().getMap().getReactorByName("light").getState() == 3) {
	if (pi.getPlayer().getParty().getLeader().getId() != pi.getPlayer().getId()) {
		pi.getClient().getSession().write(Packages.tools.packet.CWvsContext.serverNotice(5, "The party leader can decide the direction."));
		return false;
		}
		pi.getPlayer().getMap().broadcastMessage(Packages.tools.packet.CWvsContext.serverNotice(6, "You are moved to the cave of darkness."));
		pi.warpMap(240050310, 0); //暗黑洞穴
		return true;
		}
		pi.getClient().getSession().write(Packages.tools.packet.CWvsContext.serverNotice(5, "Your access is blocked by invisible power."));
		return false;
}