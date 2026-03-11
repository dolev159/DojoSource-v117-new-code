/*
	名字:	最後的試煉
	地圖:	雜貨商店後院
	描述:	913070050
*/

var status = -1;

function end(mode, type, selection) {
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
		qm.sendNextS("Empress, I do not have faith in this boy. We know nothing about him. l don't think he is fit to be the knight of light.", 1);
		break;
	case 1:
		qm.sendNextPrevS("Dear Nineheart, I should have known better than to assume you would trust in faith. Go ahead and test him, but be gentle.", 5, 1106001);
		break;
	case 2:
		qm.sendNextPrevS("Wait, what?", 3);
		break;
	case 3:
		qm.sendNextPrevS("I'm trying to test your potential. Show me the skills you possess.", 1);
		break;
	case 4:
		qm.dispose();
		qm.getPlayer().getMap().hideNpc(1106001);
		qm.getPlayer().getMap().hideNpc(1106003);
		qm.spawnNPCRequestController(1106005, 200, 50, 0);
		qm.getNPCDirectionEffect(1106005, "Effect/Summon.img/0", 3000, 0, 0);
		Packages.server.quest.MapleQuest.getInstance(20035).forceStart(qm.getPlayer(), qm.getNpc(), null);
		qm.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(9001050), new java.awt.Point(200, 50));
		qm.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(9001050), new java.awt.Point(200, 50));
		qm.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(9001050), new java.awt.Point(200, 50));
		qm.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(9001050), new java.awt.Point(200, 50));
		qm.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(9001050), new java.awt.Point(200, 50));
		qm.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(9001050), new java.awt.Point(200, 50));
		qm.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(9001050), new java.awt.Point(200, 50));
		qm.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(9001050), new java.awt.Point(200, 50));
		qm.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(9001050), new java.awt.Point(200, 50));
		qm.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(9001050), new java.awt.Point(200, 50));
		qm.getEventManager("q20035").startInstance(qm.getPlayer());
}
}