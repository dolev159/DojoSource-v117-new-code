/*
	名字:	尋找遺失的記憶
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
		status--;
		break;
	case 1:
		status++;
		break;
		}
	switch (status) {
	case 0:
		qm.sendNext("Hi, #h0#! It's been a while, huh?");
		break;
	case 1:
		qm.sendNextPrev("Memories? If you're referring to when we first met at Limbert's, yes, I remember. You were... quite insignificant back then. Rather pathetic, if you ask me...");
		break;
	case 2:
		qm.sendNextPrev("Well, I guess it could be considered a fond memory sorts...");
		break;
	case 3:
		qm.getClient().getSession().write(Packages.tools.packet.CWvsContext.getShowQuestCompletion(3559));
		Packages.server.quest.MapleQuest.getInstance(3559).forceComplete(qm.getPlayer(), qm.getNpc());
		Packages.server.quest.MapleQuest.getInstance(7081).forceStart(qm.getPlayer(), qm.getNpc(), 1);
		qm.dispose();
}
}