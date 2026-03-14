/*
	名字:	猶他家
	地圖:	前院
	描述:	100030102
*/

function enter(pi) {
	if (pi.getPlayer().getJob() == 2001 && pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(22003)).getStatus() < 1) {
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "There is no need to go outside right now."));
		return false;
		}
		pi.getPlayer().changeMap(pi.getMap(100030200), pi.getMap(100030200).getPortal(2)); //小路
		return true;
}