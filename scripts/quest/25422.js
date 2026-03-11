/*
	名字:	傀儡師普蘭西斯3
	地圖:	隱藏玩偶師的洞穴
	描述:	910600102
*/

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
		qm.sendNext("I-I can't tell you anything else! lf Eleanor finds out what I said...");
		break;
	case 1:
		qm.sendNextPrevS("Save the quivering lip for your bosses. Just tell me who the master of the Black Wings is and we can be done with this.", 2);
		break;
	case 2:
		qm.sendNextPrev("Are you kidding? They'll eat me alive! I can't tell you that!");
		break;
	case 3:
		qm.sendNextPrevS("#p1404000#, #p1404000#, #p1404000#... you are a lot tougher than anyone gives you credit for. You know that, don't you?", 2);
		break;
	case 4:
		qm.sendNextPrev("Woah, not the cane again! I don't know anything else! I promise, it's not even going to help you! Please!!");
		break;
	case 5:
		qm.removeNpc(qm.getPlayer().getMap().getId(), qm.getNpc());
		Packages.server.quest.MapleQuest.getInstance(25422).forceStart(qm.getPlayer(), qm.getNpc(), null);
		qm.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(9300502), new java.awt.Point(187, 246));
		qm.dispose();
}
}