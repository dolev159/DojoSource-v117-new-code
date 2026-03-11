/*
	名字:	精靈遊俠
	地圖:	燃燒的廢墟
	描述:	272000310
*/

var status;

var quest = true;

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	switch (mode) {
	case -1:
		cm.dispose();
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
		if (cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(31174)).getStatus() != 1 && quest) {
			cm.dispose();
			return;
			}
		if (cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(31174)).getStatus() < 2) {
		if (cm.getPlayer().itemQuantity(4033082) < 1) {
			cm.sendOkS("The Essence of Afrien I gave up to rescue Mercedes is missing. Talk to me after you forfeit the quest.", 4, 2144006);
			cm.dispose();
			return;
			}
			Packages.server.quest.MapleQuest.getInstance(31186).forceStart(cm.getPlayer(), 0, 1); //精靈特效
			Packages.server.quest.MapleQuest.getInstance(31174).forceComplete(cm.getPlayer(), cm.getNpc());
			cm.getClient().getSession().write(Packages.tools.packet.CWvsContext.getShowQuestCompletion(31174));
			cm.gainItem(4033082, -1);
			cm.gainExp(301891);
			quest = false;
			}
			cm.sendNextS("(A radiant light poured over Mercedes and the color returned to her face.)", 3);
			break;
	case 1:
		cm.sendPrevS("The heroes are secure, thanks to you. But one thing bothers me...", 4, 2144006);
		break;
	case 2:
		cm.dispose();
}
}