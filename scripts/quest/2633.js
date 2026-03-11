/*
	名字:	崔斯坦的弟子
	地圖:	墮落城市後街
	描述:	103050000
*/

var status = -1;

function start(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		if (status > 4) {
		qm.sendNextS("...Why would you refuse?", 12);
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
		qm.sendNextS("#h0#, did you meet Jeppi? Did you find about the Dark Lord's corruption?", 12);
		break;
	case 1:
      		qm.sendNextPrevS("(I tell Jeppi's story.)", 2);
		break;
	case 2:
      		qm.sendNextPrevS("What... Am I supposed to believe that?", 12);
		break;
	case 3:
      		qm.sendNextPrevS("I don't. No, you're saying history's been manipulated? Everything we know to be true is a lie? I... Give me a moment.", 12);
		break;
	case 4:
      		qm.sendNextPrevS("I believe Tristan's apprentice is out in the depths of Sleepywood. Head over there.", 12);
		break;
	case 5:	
		qm.sendYesNoS("The previous Dark Lord, Tristan, left with Jin to fight the 'mysterious enemy,' under the guise of fighting Lord Balrog. Tristan's apprentice might know more about that. I can send you there if you like.", 12);
		break;
	case 6:
		qm.dispose();
		qm.getPlayer().changeMap(qm.getMap(105100100), qm.getMap(105100100).getPortal(0));
		Packages.server.quest.MapleQuest.getInstance(2633).forceStart(qm.getPlayer(), qm.getNpc(), null);
}
}