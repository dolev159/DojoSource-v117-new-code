/*
	名字:	封印的存在
	地圖:	神木村
	描述:	240000000
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
		qm.sendNext("You did not take your time, did you? Or perhaps an old man's memories just move at such a slow pace that the young seem to flit about like mosquitoes, haha.");
		break;
	case 1:
		qm.sendNextPrevS("Do you remember anything?", 2);
		break;
	case 2:
		qm.sendNextPrev("Among us Halfingers, there was a dragon trainer by the name of #b#p2082003##k. It was from him, where I heard something weird about time. Mentioned some sort of seal and other stuff... I don't really remember.");
		break;
	case 3:
		qm.sendNextPrevS("Where can I find this #p2082003#?", 2);
		break;
	case 4:
		qm.sendNextPrev("A brilliant question. Unfortunately, nobody knows where he went, or if he's even still alive! Quite a pickle, I know.");
		break;
	case 5:
		qm.sendNextPrevS("(This seems to be a dead end... Wait, is the Time Diver glowing?!)", 2);
		break;
	case 6:
		qm.dispose();
		qm.getPlayer().changeMap(qm.getMap(240000110), qm.getMap(240000110).getPortal(2));
		Packages.server.quest.MapleQuest.getInstance(3781).forceStart(qm.getPlayer(), qm.getNpc(), null);
}
}