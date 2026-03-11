/*
	名字:	影武者之路2
	地圖:	雪姬的房間
	描述:	103050101
*/

var status = -1;

function start(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		if (status > 0) {
		qm.sendOk("You cannot stay a mere Blade Recruit. You #bwill#k have to face up to the test. \r\nTalk to me when you are ready.");
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
		qm.sendNext("You must prove yourself before you can advance to Blade Acolyte. Pass the test first!");
		break;
	case 1:
		qm.sendAcceptDecline("Fight the Shadow Blade Lords and retrieve a Dark Marble from them. This will awaken your Mirror of Insight. I'll send you over immediately once you accept.");
		break;
	case 2:
		qm.dispose();
		qm.getPlayer().changeMap(qm.getMap(910350300), qm.getMap(910350300).getPortal(0));
		Packages.server.quest.MapleQuest.getInstance(2638).forceStart(qm.getPlayer(), qm.getNpc(), null);
}
}

function end(mode, type, selection) {
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
		if (qm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.EQUIP).getNumFreeSlot() < 3) {
			qm.sendOk("Empty at least #bthree Equip slots#k before you advance to Blade Acolyte.");
			qm.dispose();
			return;
			}
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(2638)).getStatus() < 2) {
			Packages.server.quest.MapleQuest.getInstance(2638).forceComplete(qm.getPlayer(), qm.getNpc());
			qm.getPlayer().changeJob(431);
			qm.gainItem(1052244, 1);
			qm.removeAll(4031013);
			}
			qm.sendNext("Only Dual Blades who protect others can become Blade Acolytes.");
			break;
	case 1:
      		qm.sendNextPrev("We may sneak through the shadows and fight alone, but we can't fight only for ourselves. The Mirror of lnsight looks out for the weak.");
		break;
	case 2:
      		qm.sendNextPrev("Your selflessness reminds me of the day I met my father. He rescued me from monsters, and then adopted me as his own daughter...");
		break;
	case 3:
      		qm.sendNextPrev("I hope you can fight with that same selfless heart.");
		break;
	case 4:
      		qm.sendPrev("I've given you new equipment to lend you strength. Make good use of it.");
		break;
	case 5:
		qm.dispose();
}
}