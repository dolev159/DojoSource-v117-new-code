/*
	名字:	事故的原因
	地圖:	泰拉森林時空之門
	描述:	240070000
*/

var status = -1;

function start(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		if (type == 2) {
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
		qm.sendNext("One thing still bothers me. I just can't seem to figure out what caused the accident. During all my time traveling, I've never run across anything that pointed at the truth.");
		break;
	case 1:
		qm.sendNextPrevS("We did everything we could, right?", 2);
		break;
	case 2:
		qm.sendNextPrev("If we can't figure out what caused the accident, we can't stop it. I can't keep jumping around time for no reason. Now that the Time Diver is in one piece, maybe we can use it for good.");
		break;
	case 3:
		qm.sendNextPrevS("Does the Time Diver tell you that too?", 2);
		break;
	case 4:
		qm.sendYesNo("No, but it might lead us to people who have close ties to the power of time. There must be someone out there that can help. What do you say?");
		break;
	case 5:
		qm.sendNext("Trust your body to the power of the Time Diver. It will take you to the nearest time user.");
		break;
	case 6:
		qm.dispose();
		qm.getPlayer().changeMap(qm.getMap(240000000), qm.getMap(240000000).getPortal(0));
		Packages.server.quest.MapleQuest.getInstance(3780).forceStart(qm.getPlayer(), qm.getNpc(), null);
}
}