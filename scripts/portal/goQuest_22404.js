/*
	名字:	水世界
	地圖:	動物園
	描述:	230000003
*/

function enter(pi) {
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(22404)).getStatus() != 1 && pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(22405)).getStatus() != 1) {
		return false;
		}
	if (pi.getPlayer().itemQuantity(4000592) < 50 || pi.getPlayer().itemQuantity(4032474) < 1) {
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "You will be moved to the Sea of Silence."));
		pi.getPlayer().changeMap(pi.getMap(923030000), pi.getMap(923030000).getPortal(1)); //寂靜的大海裡
		return true;
		}
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "You have collected all the materials. Go see Kenta."));
		return false;
}