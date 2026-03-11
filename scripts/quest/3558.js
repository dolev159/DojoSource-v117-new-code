/*
	名字:	尋找遺失的記憶
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
		status--;
		break;
	case 1:
		status++;
		break;
		}
	switch (status) {
	case 0:
		qm.sendNext("D-Do I remember when we first met? Of course, I do! I was so excited to see such a skilled warrior entering Secret Garden. I had high hopes for you, you know.");
		break;
	case 1:
		qm.sendNextPrev("You didn't let me down... You made me proud of being your teacher...");
		break;
	case 2:
		qm.getClient().getSession().write(Packages.tools.packet.CWvsContext.getShowQuestCompletion(3558));
		Packages.server.quest.MapleQuest.getInstance(3558).forceComplete(qm.getPlayer(), qm.getNpc());
		Packages.server.quest.MapleQuest.getInstance(7081).forceStart(qm.getPlayer(), qm.getNpc(), 1);
		qm.dispose();
}
}