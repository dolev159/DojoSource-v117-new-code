/*
	名字:	潛入作戰
	地圖:	大廳
	描述:	915000100
*/

var status = -1;

function start(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		if (status > 3) {
		qm.sendNext("The window of opportunity will not remain open forever.");
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
		qm.sendNext("All preparations complete. The #m150000000# is anchored directly above the Knight's Chamber and it does not appear that we have been spotted from below.");
		break;
	case 1:
		qm.sendNextPrev("You will need to remain wary. The security in #m130000000# is currently on high alert. I suppose having this many of Maple World's leaders in one place warrants the rather excessive defense strategy they've adopted.");
		break;
	case 2:
		qm.sendNextPrev("Still, they are only guards. It should not prove too difficult for a seasoned thief like yourself to slip past them unnoticed. Keep a close watch on their eyelines and you will be fine.");
		break;
	case 3:
		qm.sendNextPrev("The Lumiere will remain here until you return. Do not concern yourself with the pursuit. We'll keep the engine running.");
		break;
	case 4:
		qm.sendAcceptDecline("It is time for you to make your decision. Are you ready to infiltrate #m130000000#?");
		break;
	case 5:
		qm.sendOk("I wish you luck.");
		Packages.server.quest.MapleQuest.getInstance(25000).forceStart(qm.getPlayer(), qm.getNpc(), null);
		break;
	case 6:
		qm.dispose();
}
}