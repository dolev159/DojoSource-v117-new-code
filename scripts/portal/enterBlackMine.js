/*
	名字:	乾枯的路
	地圖:	去礦山的路2
	描述:	310040100
*/

function enter(pi) {
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(23143)).getStatus() == 1) {
	if (pi.getMap(931000620).getCharacters().size() < 1) {
		pi.getMap(931000620).resetFully();
		pi.getPlayer().changeMap(pi.getMap(931000620), pi.getMap(931000620).getPortal(1)); //礦山入口
		return true;
		}
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "This field has already been taken by someone. Please try again later, or try a different channel."));
		return false;
		}
		pi.getPlayer().changeMap(pi.getMap(310040200), pi.getMap(310040200).getPortal(3)); //礦山入口
		return true;
}