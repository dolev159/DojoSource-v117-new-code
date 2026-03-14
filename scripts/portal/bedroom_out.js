/*
	名字:	鯨魚號
	地圖:	寢室
	描述:	912060500
*/

function enter(pi) {
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(2570)).getStatus() < 1) {
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.getTopMsg("You still got some stuff to take care of. I can see it in your eyes. Wait...no, those are eye boogers."));
		return false;
		}
		pi.getPlayer().changeMap(pi.getMap(120000101), pi.getMap(120000101).getPortal(0)); //航海室
		return true;
}