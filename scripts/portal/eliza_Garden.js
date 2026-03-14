/*
	名字:	天空之城
	地圖:	天空階梯 II
	描述:	200010300
*/

function enter(pi) {
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(3111)).getStatus() < 1) {
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "Cannot enter because of the fallen pillar."));
		return false;
		}
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(3112)).getStatus() < 1) {
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "Unable to enter because of all the debris from the fallen post."));
		return false;
		}
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "I could feel a force pulling me amidst the debris of the fallen post."));
		pi.getPlayer().changeMap(pi.getMap(920020000), pi.getMap(920020000).getPortal(2)); //艾利傑的庭園
		return true;
}