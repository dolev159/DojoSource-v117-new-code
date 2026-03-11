/*
	名字:	異常的動靜
	地圖:	異常的動靜
	描述:	異常的動靜
*/

var map = 913070400;
var num = 10;

var status = -1;

function start(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		status--;
		break;
	case 1:
		status++;
		break;
		}
	switch (status) {
	case 0:
		qm.sendNextS("#b(Somebody's watching me...)#k \r\n\r\nWho goes there?!", 16);
		break;
	case 1:
		for (var i = 0; i < num; i++)
		if (qm.getMap(map + i).getCharacters().size() < 1) {
			qm.getMap(map + i).resetFully();
			qm.getPlayer().changeMap(qm.getMap(map + i), qm.getMap(map + i).getPortal(0));
			qm.getPlayer().startMapTimeLimitTask(600, qm.getMap(102020500));
			Packages.server.quest.MapleQuest.getInstance(20784).forceStart(qm.getPlayer(), qm.getNpc(), null);
			qm.getClient().getSession().write(Packages.tools.packet.CWvsContext.getTopMsg("Mysterious attackers surround you."));
			qm.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(9001056), new java.awt.Point(512, 1607));
			qm.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(9001056), new java.awt.Point(512, 1607));
			qm.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(9001056), new java.awt.Point(512, 1607));
			qm.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(9001056), new java.awt.Point(512, 1607));
			qm.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(9001056), new java.awt.Point(1460, 1725));
			qm.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(9001056), new java.awt.Point(145, 1844));
			qm.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(9001056), new java.awt.Point(145, 1844));
			qm.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(9001056), new java.awt.Point(145, 1844));
			qm.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(9001056), new java.awt.Point(1233, 1964));
			qm.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(9001056), new java.awt.Point(412, 2184));
			qm.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(9001056), new java.awt.Point(412, 2184));
			qm.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(9001056), new java.awt.Point(412, 2184));
			qm.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(9001056), new java.awt.Point(412, 2184));
			qm.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(9001056), new java.awt.Point(1273, 2145));
			qm.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(9001056), new java.awt.Point(1273, 2145));
			qm.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(9001056), new java.awt.Point(1273, 2145));
			qm.dispose();
			return;
			}
			qm.getClient().getSession().write(Packages.tools.packet.CWvsContext.serverNotice(5, "Try again soon."));
			qm.dispose();
}
}