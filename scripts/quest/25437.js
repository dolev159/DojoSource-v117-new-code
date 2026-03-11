/*
	名字:	Mr.翅膀史烏
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
		qm.sendNextS("You look surprised. I guess I can't blame you. My body is asleep, but my soul roams free. Not the best look for me, is it?", 1);
		break;
	case 1:
		qm.sendNextPrevS("I'm just surprised to see you alive, #p1404005#...", 17);
		break;
	case 2:
		qm.sendNextPrevS("You didn't think I would rest while you were out roaming around, did you? I may not be in the best shape, but I will destroy you and all of your little friends.", 1);
		break;
	case 3:
		qm.sendNextPrevS("You're holding quite the grudge. You were the one controlling Wiz the Librarian, I take it?", 17);
		break;
	case 4:
		qm.sendNextPrevS("lt's amazing the secrets your mind can unlock when freed from its bodily shell. I've found this delightful little power to possess others and have them do my bidding. Would you like to see it again?", 1);
		break;
	case 5:
		qm.removeNpc(qm.getPlayer().getMap().getId(), qm.getNpc());
		qm.removeNpc(qm.getPlayer().getMap().getId(), 1404006);
		Packages.server.quest.MapleQuest.getInstance(25437).forceStart(qm.getPlayer(), qm.getNpc(), null);
		qm.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(9300506), new java.awt.Point(931, 2119));
		qm.dispose();
}
}

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
		qm.sendNext("lt seems you've been practicing and #p1404006# is no weakling either... It seems that the time has come for me to take my leave.");
		break;
	case 1:
		qm.sendNextPrevS("Answer this before you go, #p1404005#. Are you the one who's been erasing us from the history of Maple World?", 2);
		break;
	case 2:
		qm.sendNextPrev("I thought you might have stumbled on that little scheme, though I fear your ego has involved you more than you deserve. I erased those issues for my lord, the Black Mage. Your losses were incidental.");
		break;
	case 3:
		qm.sendNextPrevS("You've been erasing the records on the Black Mage? What good would that even do?", 2);
		break;
	case 4:
		qm.sendNextPrev("Figure it out on your own, hero. lsn't that what you do for a living? Hassle us pointlessly?");
		break;
	case 5:
		qm.sendNextPrev("Keep playing at your little games. No matter what you do, no matter where you go, the almighty Black Mage will be there. \r\n\r\n#fUI/UIWindow.img/QuestIcon/8/0# 26800 exp");
		break;
	case 6:
		qm.dispose();
		qm.gainExp(26800);
		Packages.server.quest.MapleQuest.getInstance(25437).forceComplete(qm.getPlayer(), qm.getNpc());
		qm.getPlayer().changeMap(qm.getMap(105000000), qm.getMap(105000000).getPortal(0));
}
}