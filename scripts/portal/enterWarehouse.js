/*
	名字:	亞泰爾營地
	地圖:	營地會議場
	描述:	300000010
*/

function enter(pi) {
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(21752)).getStatus() > 1 && pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(21753)).getStatus() < 1) {
	if (pi.getMap(930010000).getCharacters().size() < 1) {
		pi.getPlayer().changeMap(pi.getMap(930010000), pi.getMap(930010000).getPortal(1)); //危險的圖書館
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "You've entered the library. Use your mouse to search for the safe."));
		pi.getPlayer().startMapTimeLimitTask(600, pi.getMap(300000010));
		return true;
		}
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "It looks like the path hasn't opened up yet. Try again a little later."));
		return false;
		}
		pi.getPlayer().changeMap(pi.getMap(300000011), pi.getMap(300000011).getPortal(1)); //圖書館
		return true;
}