/*
	名字:	勇士之村派遣任務開始前
	地圖:	耶雷弗
	描述:	130000000
*/

var status = -1;

function start(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		if (status < 1) {
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
		qm.sendAcceptDecline("How's the leveling up so far? By this time, you might be able to participate in the Party Quest at #m103000000#. Leveling up is important, yes, but we need you now to take on a mission as a Cygnus Knight. We just received a new information that may help us.");
		break;
	case 1:
		Packages.server.quest.MapleQuest.getInstance(20720).forceStart(qm.getPlayer(), qm.getNpc(), null);
		qm.dispose();
}
}