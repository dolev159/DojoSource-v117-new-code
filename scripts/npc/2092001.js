/*
	名字:	黃船長
	地圖:	靈藥幻境
	描述:	251000000
*/

var status;

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
		if (status > 0) {
		cm.sendNext("Not yet, huh?");
		cm.dispose();
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
		if (cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(22587)).getStatus() != 1) {
			cm.sendOk("You want to find the pirates? Unless you have some clever plan, I'd steer clear of them.");
			cm.dispose();
			return;
			}
		if (cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(22587)).getMobKills(9001029) > 99 && cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(22587)).getMobKills(9001030) > 99) {
			cm.sendOk("Didn't you already defeat the Red-Nose Pirates?");
			cm.dispose();
			return;
			}
			cm.sendNext("Let me give you a little heads-up. If you leave the vault without saving Potter, you will surely be captured by the pirates and, well, I don't think that'll end well for you. You must not leave the vault alone.");
			break;
	case 1:
		cm.sendYesNo("Make sure to heed my warning. Are you ready to go now?");
		break;
	case 2:
		cm.dispose();
		cm.getPlayer().changeMap(cm.getMap(925110001), cm.getMap(925110001).getPortal(1));
}
}