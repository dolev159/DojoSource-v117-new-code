/*
	名字:	皇后之路
	地圖:	修煉森林2
	描述:	130010100
*/

var quest = [20301, 20302, 20303, 20304, 20305];

function enter(pi) {
	for (var i = 0; i < quest.length; i ++)
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(quest[i])).getStatus() == 1) {
	if (pi.getMap(913002200).getCharacters().size() > 0) {
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "This forest is already being searched by someone else. Come back later."));
		return false;
		}
		pi.getMap(913002200).resetFully();
		pi.getPlayer().changeMap(pi.getMap(913002200), pi.getMap(913002200).getPortal(1)); //提姆森林
		pi.getPlayer().getMap().spawnNpc(1104100, new java.awt.Point(250, 88));
		pi.getPlayer().startMapTimeLimitTask(600, pi.getMap(130010100));
		return true;
		}
		pi.getPlayer().changeMap(pi.getMap(130010110), pi.getMap(130010110).getPortal(2)); //提姆森林
		return true;
}