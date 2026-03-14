/*
	名字:	艾納斯島
	地圖:	長老公館
	描述:	211000001
*/

function enter(pi) {
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(22575)).getStatus() == 1) {
	if (pi.getPlayer().itemQuantity(4000593) < 150) {
		pi.getPlayer().changeMap(pi.getMap(921110100), pi.getMap(921110100).getPortal(1)); //亡者們的森林
		return true;
		}
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "You have collected enough materials. Go see Shammos."));
		return false;
		}
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(22577)).getStatus() == 1) {
	if (pi.getPlayer().itemQuantity(4000593) < 300) {
		pi.getPlayer().changeMap(pi.getMap(921110100), pi.getMap(921110100).getPortal(1)); //亡者們的森林
		return true;
		}
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "You have collected enough materials. Go see Shammos."));
		}
		return false;
}