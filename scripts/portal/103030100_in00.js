/*
	名字:	沼地
	地圖:	野生鱷魚沼地
	描述:	103030100
*/

function enter(pi) {
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(2878)).getStatus() == 1) {
	if (pi.getMap(910310300).getCharacters().size() > 0) {
		pi.getClient().getSession().write(Packages.tools.packet.CWvsContext.serverNotice(5, "Looks like someone's inside the Hut in the Swamp. Try entering later."));
		return false;
		}
		pi.getMap(910310300).resetFully();
		pi.getPlayer().changeMap(pi.getMap(910310300), pi.getMap(910310300).getPortal(1)); //雪屋平原
		for (var i = 0; i < 7; i++)
		pi.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(3110100), new java.awt.Point(-100 + (Math.random() * 350), 155));
		pi.getPlayer().startMapTimeLimitTask(300, pi.getMap(103030100));
		return true;
		}
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(2620)).getStatus() == 1) {
	if (pi.getMap(910350210).getCharacters().size() > 0) {
		pi.getClient().getSession().write(Packages.tools.packet.CWvsContext.serverNotice(5, "Looks like someone's inside the Hut in the Swamp. Try entering later."));
		return false;
		}
		pi.getMap(910350210).resetFully();
		pi.getPlayer().changeMap(pi.getMap(910350210), pi.getMap(910350210).getPortal(1)); //沼地小屋
		return true;
		}
		pi.getPlayer().changeMap(pi.getMap(103030101), pi.getMap(103030101).getPortal(1)); //沼地小屋
		return true;
}