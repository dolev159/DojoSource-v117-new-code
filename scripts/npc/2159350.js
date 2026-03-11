/*
	名字:	可疑的女子
	地圖:	發電廠大廳
	描述:	931050701
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
		cm.sendNext("...! What? Who is that...Black Wings?!");
		break;
	case 1:
		cm.sendNextPrevS("Who are you? Where's Hiver?!", 2);
		break;
	case 2:
		cm.sendNextPrev("(No, this person can't be with the Black Wings...)");
		break;
	case 3:
		cm.sendNextPrev("Who are you? Identify yourself!");
		break;
	case 4:
		cm.sendNextPrevS("I'm Evan! Take me to Hiver right this instant!", 2);
		break;
	case 5:
		cm.sendNextPrev("(This is just a civilian... I should just be on my way. No need to mess with a random civilian.)");
		break;
	case 6:
		cm.removeNpc(cm.getPlayer().getMap().getId(), cm.getNpc());
		Packages.server.quest.MapleQuest.getInstance(22615).forceStart(cm.getPlayer(), 0, 1);
		cm.dispose();
}
}