/*
	名字:	帕必歐
	地圖:	可疑的美髮店
	描述:	931010030
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
		status--;
		break;
	case 1:
		status++;
		break;
		}
	switch (status) {
	case 0:
		if (cm.getPlayer().getMap().getAllMonstersThreadsafe().size() > 0) {
			cm.sendNext("How dare you come into the Hair Salon without permission! Unforgiveable!");
			cm.dispose();
			return;
			}
			cm.sendNext("What are you doing?! How dare you try to destroy the Firebombs I worked so hard to obtain! Do you realize how expensive these are? I paid an exorbitant amount of money so that I could learn a new perm!!");
			break;
	case 1:
		cm.sendNextPrev("What? You've come in the name of the Watchmen to keep an eye on me? I don't even have the freedom to pursue beautiful hair?! I won't stand for this! I'm going to require compensation for the damage you've caused!");
		break;
	case 2:
		Packages.server.quest.MapleQuest.getInstance(23979).forceStart(cm.getPlayer(), 0, 1);
		cm.dispose();
}
}