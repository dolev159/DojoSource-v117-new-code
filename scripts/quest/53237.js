/*
	名字:	Enhancing the Core
	地圖:	Master Forge
	描述:	552000071
*/

var status = -1;

function start(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		if (status > 7) {
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
		qm.sendNext("Who dares disturb the greatest blacksmith in the world as he contemplates the co-valence of carbon-based binding agents?!");
		break;
	case 1:
		qm.sendNextPrevS("That was a lot of words, smithy. My name is #b#h0##k and I wanted to know if you can fix this.", 16);
		break;
	case 2:
		qm.sendNextPrev("Ah, you are that 'alien' Kyrin spoke of. I will take a moment from pondering the boundless depths of our physical world to take a look at your problem. You called it a 'core'?");
		break;
	case 3:
		qm.sendNextPrev(".........");
		break;
	case 4:
		qm.sendNextPrev("This stone's atomic structure is quite foreign. lt is indeed from another world. Where does this come from?");
		break;
	case 5:
		qm.sendNextPrevS("It's... a long story. Do you think you can fix it?", 16);
		break;
	case 6:
		qm.sendNextPrev("It is an odd piece of technology, but it is not outside my understanding. Bring me some #bBlue Ore#k. It should create a sort of energy barrier that will hold it together.");
		break;
	case 7:
		qm.sendNextPrevS("Where do I find #bBlue Ore#k?", 16);
		break;
	case 8:
		qm.sendAcceptDecline("If you are up to a challenge, you'll have your best luck in the depths of the #bBlue Ore Cave#k. It's quite deep and quite full of monsters. If you leave early, you will have to #bforfeit the quest and start again#k. Be sure to be prepared before you enter.");
		break;
	case 9:
		qm.dispose();
		Packages.server.quest.MapleQuest.getInstance(53237).forceStart(qm.getPlayer(), qm.getNpc(), null);
		qm.getPlayer().changeMap(qm.getMap(552000072), qm.getMap(552000072).getPortal(0));
}
}