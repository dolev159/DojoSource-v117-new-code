/*
	名字:	猶他家
	地圖:	客廳
	描述:	100030101
*/

function enter(pi) {
	if (pi.getPlayer().getJob() == 2001 && pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(22000)).getStatus() < 1) {
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "Click Anna and accept the quest in order to exit the living room."));
		return false;
		}
		pi.getPlayer().changeMap(pi.getMap(100030102), pi.getMap(100030102).getPortal(2)); //前院
		return true;
}