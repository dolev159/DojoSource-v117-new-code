/*
	名字:	尋找遺失的記憶
	地圖:	大廳
	描述:	150010000
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
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(3545)).getStatus() < 1) {
			Packages.server.quest.MapleQuest.getInstance(3545).forceStart(qm.getPlayer(), qm.getNpc(), null);
			qm.dispose();
			return;
			}
			qm.sendNext("All that training must have tired you greatly. Shall I prepare a hot bath? Some tea to soothe the nerves?");
			break;
	case 1:
		qm.sendNextPrevS("It's strange to see you acting as a butler, Gaston. I remember the old days, when we first met..", 2);
		break;
	case 2:
		qm.sendNextPrev("That was quite some time ago. I'm afraid my memories are not as clear as yours.");
		break;
	case 3:
		qm.sendNextPrevS("When I first met you, I wouldn't have trusted you to put me out if I'd been on fire. Now, I can't imagine trying to get my shoes on in the morning without your help.", 2);
		break;
	case 4:
		qm.sendNextPrev("I seem to recall a young, rich braggart who believed he was setting off on a noble adventure. I think I still have the wallet I lifted off of you when you were berating me for my shabby clothing.");
		break;
	case 5:
		qm.sendNextPrevS("I was never that naive and you certainly never got my wallet off of me.", 2);
		break;
	case 6:
		qm.sendNextPrev("Oh-ho! I beg to differ! You have been a snotty little brat since the moment I met you and I would be happy to produce the ancient sticker-covered billfold should you truly require...");
		break;
	case 7:
		qm.sendNextPrevS("H-hey... here I am reminiscing with an old friend and you turn it nasty! You are a hateful old man!", 2);
		break;
	case 8:
		qm.sendNextPrev("You have ever remained open to objective critique, haven't you master? A paragon of self-improvement. Heheheh...");
		break;
	case 9:
		qm.sendNextPrevS("I know that laugh. You're mocking me! I hate it when you mock me!", 2);
		break;
	case 10:
		qm.sendNextPrev("What ever do you mean? Hehehehe...");
		break;
	case 11:
		qm.sendNextPrevS("That old man will be the death of me... but I hope he never leaves.", 2);
		break;
	case 12:
		Packages.server.quest.MapleQuest.getInstance(3545).forceComplete(qm.getPlayer(), qm.getNpc());
		Packages.server.quest.MapleQuest.getInstance(7081).forceStart(qm.getPlayer(), qm.getNpc(), 1);
		qm.dispose();
}
}