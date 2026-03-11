/*
	名字:	傀儡師普蘭西斯1
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
		qm.sendNext("I told #p2154002#, I'm taking a break from all that evil stuff! I'm sick of you guys barging into my house and trying to make me out to be a bad guy all the time!");
		break;
	case 1:
		qm.sendNextPrevS("You think I'm one of the #p1101000# Knights? You're going to find I don't play by the same rules as those boy scouts. Answer a few of my questions and I'll be on my way.", 2);
		break;
	case 2:
		qm.sendNextPrev("Questions? Wh-what? No way! Never! You come into MY house and start demanding answers! Get out of here!");
		break;
	case 3:
		qm.sendNextPrevS("I thought a puppet master would be smarter than this...", 2);
		break;
	case 4:
		qm.sendNextPrev("W-wait! What are you doing?! Why are you grabbing your cane?! S-stop! Aaahhhh!");
		break;
	case 5:
		qm.removeNpc(qm.getPlayer().getMap().getId(), qm.getNpc());
		Packages.server.quest.MapleQuest.getInstance(25420).forceStart(qm.getPlayer(), qm.getNpc(), null);
		qm.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(9300501), new java.awt.Point(187, 246));
		qm.dispose();
}
}