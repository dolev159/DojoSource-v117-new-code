/*
	名字:	Tracking Down the Sender
	地圖:	玩具城
	描述:	220000000
*/

var status = -1;

function start(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		if (status > 5) {
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
		qm.sendNext("Huh? Are you some sort of homunculus I forgot I'd summoned?");
		break;
	case 1:
		qm.sendNextPrevS("No, I'm a bounty hunter, and I'm looking for the person who gave you this letter.", 2);
		break;
	case 2:
		qm.sendNextPrev("Oh, the letter! That was the easlest 1000 mesos I ever made! I didn't know the gentleman, but he did have the most awe-inspiring crimson hair. lt was almost as red as the inside of an Adonis Cauldron, if you could believe it, hahahaha! Oh. I am HILARIOUS today...");
		break;
	case 3:
		qm.sendNextPrevS("Would you stop with the lame jokes and tell me where you saw him?", 2);
		break;
	case 4:
		qm.sendNextPrev("You're no fun. I don't know that I want to help someone with no sense of humor.");
		break;
	case 5:
		qm.sendNextPrevS("L-look, I'm sorry, I just... I got a lot on my plate right now, ya know? Like a buffet of badness just staring me in the face...", 2);
		break;
	case 6:
		qm.sendYesNo("Ha! Hahahahaha! 'A buffet of badness'! What a cleverly ignorant colloquialism! Okay, I'll take you where you need to go.");
		break;
	case 7:
		qm.dispose();
		Packages.server.quest.MapleQuest.getInstance(53251).forceStart(qm.getPlayer(), qm.getNpc(), null);
		qm.getPlayer().changeMap(qm.getMap(552000074), qm.getMap(552000074).getPortal(0));
}
}