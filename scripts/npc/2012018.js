/*
	名字:	艾利遜
	地圖:	天空之城公園
	描述:	200000200
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
		if (status < 1) {
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
		if (cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(31000)).getStatus() < 2) {
			cm.sendOk("I don't think you're ready to go Chryse. I can't move you if you've never been to Chryse by visiting me.");
			cm.dispose();
			return;
			}
			cm.sendYesNo("You want to go to Chryse?");
			break;
	case 1:
		cm.sendNext("Okay, I am going to send you to Chryse. Get ready?");
		break;
	case 2:
		cm.dispose();
		cm.getPlayer().changeMap(cm.getMap(200100001), cm.getMap(200100001).getPortal(0));
		cm.getClient().getSession().write(Packages.tools.packet.CWvsContext.getTopMsg("Pressing the JUMP key allows you to fly to Chryse."));
}
}