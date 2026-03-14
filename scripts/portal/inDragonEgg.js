/*
	名字:	潘姆之路
	地圖:	農場中心地
	描述:	100030300
*/

function enter(pi) {
	if (pi.getPlayer().getJob() == 2001 && pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(22005)).getStatus() < 1) {
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "I have no business in the Lush Forest."));
		return false;
		}
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(22005)).getStatus() == 1) {
	if (pi.getPlayer().itemQuantity(4032449)) {
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "The piglet has already been rescued. No need to go to the Lush Forest."));
		return false;
		}
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(22011)).getStatus() == 2) {
		Packages.server.quest.MapleQuest.getInstance(22015).forceStart(pi.getPlayer(), 0, 0);
		pi.getPlayer().changeMap(pi.getMap(900020110), pi.getMap(900020110).getPortal(2)); //茂盛的森林
		return true;
		}
		pi.getPlayer().changeMap(pi.getMap(900020100), pi.getMap(900020100).getPortal(1)); //茂盛的森林
		return true;
		}
		pi.getPlayer().changeMap(pi.getMap(100030301), pi.getMap(100030301).getPortal(1)); //茂盛的森林
		return true;
}