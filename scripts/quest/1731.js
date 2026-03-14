/*
	名字:	看守著蛋吧！
	地圖:	孵化室
	描述:	956030000
*/

var status = -1;

function start(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		if (status < 1) {
		qm.dispose();
		return;
		}
		status--;
		break;
	case 1:
		status++;
		break;
		}
	switch (status) {
	case 0:
		qm.sendNext("This is a good nest, right? Of course it is. I built it! What a happy little monster I'm going to have!");
		break;
	case 1:
		if (qm.getPlayer().getMap().getAllMonstersThreadsafe().size() < 1) {
			Packages.server.quest.MapleQuest.getInstance(1731).forceStart(qm.getPlayer(), qm.getNpc(), null);
			qm.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(9810301), new java.awt.Point(-129, 185));
			qm.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(9810301), new java.awt.Point(200, 185));
			}
			qm.sendPrev("Yes, these should be warm and cuddly.");
			break;
	case 2:
		qm.dispose();
}
}