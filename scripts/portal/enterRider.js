/*
	名字:	艾納斯島
	地圖:	寒冰平原
	描述:	211050000
*/

function enter(pi) {
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(21610)).getStatus() != 1) {
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "Rider's Field. You cannot enter without a reason."));
		return false;
		}
	if (pi.getMap(921110000).getCharacters().size() < 1) {
		pi.getPlayer().changeMap(pi.getMap(921110000), pi.getMap(921110000).getPortal(2)); //騎士的平原
		pi.getPlayer().startMapTimeLimitTask(300, pi.getMap(211050000));
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "You have entered the Rider's Field. Ride to the end of the field to clear the mission."));
		return true;
		}
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "Someone is already in the Rider's Field. Come back a little later."));
		return false;
}