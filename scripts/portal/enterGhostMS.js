/*
	名字:	菇菇歌唱森林
	地圖:	幽靈菇菇森林
	描述:	100020400
*/

function enter(pi) {
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(24061)).getStatus() == 1 && pi.getPlayer().itemQuantity(4032965)) {
	if (pi.getMap(910080020).getCharacters().size() > 0) {
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "Try again soon."));
		return false;
		}
		pi.getMap(910080020).resetFully();
		pi.getPlayer().changeMap(pi.getMap(910080020), pi.getMap(910080020).getPortal(1)); //費洛蒙殭屍菇菇王森林
		pi.getPlayer().startMapTimeLimitTask(600, pi.getMap(100020400));
		return true;
		}
		pi.getPlayer().changeMap(pi.getMap(100020401), pi.getMap(100020401).getPortal(1)); //殭屍菇菇王的山丘
		return true;
}