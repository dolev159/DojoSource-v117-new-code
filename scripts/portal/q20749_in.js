/*
	名字:	玩具城
	地圖:	遺忘的迴廊
	描述:	220070400
*/

function enter(pi) {
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(20749)).getStatus() != 1) {
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "The door is impossible to open."));
		return false;
		}
	if (pi.getMap(922000030).getCharacters().size() > 0) {
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "Try again soon."));
		return false;
		}
		pi.getMap(922000030).resetFully();
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "The door has opened. Now entering the next dimension."));
		pi.getPlayer().changeMap(pi.getMap(922000030), pi.getMap(922000030).getPortal(1));
		pi.getPlayer().startMapTimeLimitTask(420, pi.getMap(220070400));
		return true;
}