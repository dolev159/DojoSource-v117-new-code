/*
	名字:	The Great Blacksmith
	地圖:	航海室
	描述:	120000101
*/

var status = -1;

function start(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		if (status > 6) {
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
		qm.sendNext("How are things, #b#h0##k? Got any lingering effects from getting your noggin jostled?");
		break;
	case 1:
		qm.sendNextPrevS("I'm in good shape, thanks to you and the crew, but I'm aching to move on to something bigger.", 16);
		break;
	case 2:
		qm.sendNextPrev("You space folk bounce back quick! Lucky for you, I've got just the thing to clear the cobwebs out of that melon of yours.");
		break;
	case 3:
		qm.sendNextPrev("When you first woke up, Bark had a small chunk of rock for you. Looked like it was pretty important, judging by that sparkle in your eye.");
		break;
	case 4:
		qm.sendNextPrevS("My dad passed that on to me. I don't reckon he'd be too happy if he saw the state it was in now.", 16);
		break;
	case 5:
		qm.sendNextPrev("I thought that might be the case. I called you here because I met a blacksmith that I think could help you out. He fixed my gun up, and now it can shoot through a steel hull! They say there ain't nothing he can't fix...");
		break;
	case 6:
		qm.sendNextPrevS("#b(She thinks a simple blacksmith can fix my core? I guess it's worth taking a look.)", 16);
		break;
	case 7:
		qm.sendAcceptDecline("I know a shortcut to the #bMaster Forge#k. I'll send you there if you want.");
		break;
	case 8:
		qm.dispose();
		Packages.server.quest.MapleQuest.getInstance(53236).forceStart(qm.getPlayer(), qm.getNpc(), null);
		qm.getPlayer().changeMap(qm.getMap(552000071), qm.getMap(552000071).getPortal(0));
}
}