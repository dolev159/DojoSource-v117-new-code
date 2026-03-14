/*
	名字:	皇后之路
	地圖:	修煉森林1
	描述:	130010000
*/

var quest = [20301, 20302, 20303, 20304, 20305];

function enter(pi) {
	for (var i = 0; i < quest.length; i ++)
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(quest[i])).getStatus() == 1) {
	if (pi.getMap(913002000).getCharacters().size() > 0) {
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "This forest is already being searched by someone else. Come back later."));
		return false;
		}
		pi.getMap(913002000).resetFully();
		pi.getPlayer().changeMap(pi.getMap(913002000), pi.getMap(913002000).getPortal(1)); //提諾森林
		pi.getPlayer().getMap().spawnNpc(1104102, new java.awt.Point(2517, 88));
		pi.getPlayer().startMapTimeLimitTask(600, pi.getMap(130010000));
		return true;
		}
		pi.getPlayer().changeMap(pi.getMap(130010010), pi.getMap(130010010).getPortal(2)); //提諾森林
		return true;
}