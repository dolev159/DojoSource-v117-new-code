/*
	名字:	艾麗亞
	地圖:	耶雷弗散步步道
	描述:	913050202
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
		qm.sendNextS("Still as inelegant and bullheaded as ever, aren't you, Phantom? You've been so blinded by your quest for revenge that you haven't bothered to move on with your life. You used to be smarter than this...", 1);
		break;
	case 1:
		qm.sendNextPrevS("As the Empress of Maple World, allow me to thank you. Thank you for everything you've ever done. lf it weren't for you, the world would have fallen to ruin. We owe you a debt of gratitude that no one could begin to repay.", 1);
		break;
	case 2:
		qm.sendNextPrevS("And let me apologize, as a mere woman... I am sorry for leaving you with such a heavy burden to carry. You were an uncaged bird singing in the night when we first met. Now you are trapped in a cage of unending conflict.", 1);
		break;
	case 3:
		qm.sendNextPrevS("But you and I know that we do not ask for the fates we are given. Let there be no more apologies or moments of sadness between us. I am proud to leave Maple World in your hands.", 1);
		break;
	case 4:
		qm.sendNextPrevS("These words are not only for you, Phantom. Share them with the child next to you. Without her, there is no future.", 1);
		break;
	case 5:
		qm.sendNextPrevS("Farewell, for now, dear Phantom.", 1);
		break;
	case 6:
		qm.dispose();
		qm.getPlayer().changeMap(qm.getMap(913050203), qm.getMap(913050203).getPortal(0));
		Packages.server.quest.MapleQuest.getInstance(25441).forceStart(qm.getPlayer(), qm.getNpc(), null);
}
}