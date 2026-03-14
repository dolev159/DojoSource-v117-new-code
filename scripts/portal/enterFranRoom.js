/*
	名字:	雷本礦山
	地圖:	發電廠大廳
	描述:	310050000
*/

function enter(pi) {
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(24088)).getStatus() == 1) {
	if (pi.getMap(931040000).getCharacters().size() < 1) {
		pi.getMap(931040000).resetFully();
		pi.getPlayer().changeMap(pi.getMap(931040000), pi.getMap(931040000).getPortal(1)); //人偶師房間
		pi.getPlayer().startMapTimeLimitTask(600, pi.getMap(310050000));
		return true;
		}
		pi.getClient().getSession().write(Packages.tools.packet.CWvsContext.serverNotice(5, "This field has already been taken by someone. Please try again later, or try a different channel."));
		return false;
		}
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(23268)).getStatus() == 1) {
		pi.getPlayer().changeMap(pi.getMap(931050220), pi.getMap(931050220).getPortal(1)); //普蘭西斯的房間
		return true;
		}
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(23954)).getStatus() == 1) {
	if (pi.getMap(931020010).getCharacters().size() < 1) {
		pi.getPlayer().changeMap(pi.getMap(931020010), pi.getMap(931020010).getPortal(1)); //普蘭西斯的房間
		pi.getClient().getSession().write(Packages.tools.packet.CWvsContext.serverNotice(5, "Defeat all the puppets inside Francis's room."));
		pi.getPlayer().startMapTimeLimitTask(600, pi.getMap(310050000));
		return true;
		}
		pi.getClient().getSession().write(Packages.tools.packet.CWvsContext.serverNotice(5, "Francis's room is locked. Come back later."));
		return false;
		}
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(25416)).getStatus() == 1) {
	if (pi.getMap(931040100).getCharacters().size() < 1) {
		pi.getMap(931040100).resetFully();
		for (var i = 0; i < 4; i++)
		pi.getMap(931040100).spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(9300499), new java.awt.Point(-100 + (Math.random() * 700), -282));
		for (var i = 0; i < 8; i++)
		pi.getMap(931040100).spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(9300499), new java.awt.Point(-200 + (Math.random() * 1000), 18));
		pi.getPlayer().changeMap(pi.getMap(931040100), pi.getMap(931040100).getPortal(1)); //人偶師房間
		return true;
		}
		pi.getClient().getSession().write(Packages.tools.packet.CWvsContext.serverNotice(5, "This field has already been taken by someone. Please try again later, or try a different channel."));
		return false;
		}
		pi.getClient().getSession().write(Packages.tools.packet.CWvsContext.serverNotice(5, "It appears to be someone's room... Sounds noisy in there, so you probably shouldn't go in."));
		return false;
}