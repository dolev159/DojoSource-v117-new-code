/*
	名字:	下忍
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
		if (status > 1) {
		qm.sendNext("Find me when you're ready. Do not keep me waiting.");
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
		qm.sendNext("To dual-wield, you must meet two requirements. First, you must reach level 20. Second, you must successfully retrieve a #bMirror of Insight#k, an item that reveals itself only to those worthy of dual-wielding.");
		break;
	case 1:
      		qm.sendNextPrev("The Mirror of Insight grants its owner insight. I can send you to the #bMarble Room in The Secret Garden Depths#k so you can retrieve one. Once there, #bhit marbles#k until one of them turns cloudy when it drops...");
		break;
	case 2:	
		qm.sendAcceptDecline("#bDouble-click on the cloudy marble to crack it,#k and you will obtain a Mirror of Insight. That is, assuming the Mirror deems you worthy. I'll send you to the Marble Room when you accept.");
		break;
	case 3:
		qm.dispose();
		qm.getPlayer().changeMap(qm.getMap(910350000), qm.getMap(910350000).getPortal(0));
		Packages.server.quest.MapleQuest.getInstance(2623).forceStart(qm.getPlayer(), qm.getNpc(), null);
}
}

function end(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		if (status < 1) {
		qm.sendOk("Why hesitate? What are you afraid of?")
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
		qm.sendYesNo("So, the Mirror of Insight has chosen you. Very well. I will promote you to Blade Recruit when you are ready.");
		break;
	case 1:
		if (qm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.EQUIP).getNumFreeSlot() < 1) {
			qm.sendOk("Return after making room in your Equip Inventory.");
			qm.dispose();
			return;
			}
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(2623)).getStatus() < 2) {
			Packages.server.quest.MapleQuest.getInstance(2623).forceComplete(qm.getPlayer(), qm.getNpc());
			qm.getPlayer().changeJob(430);
			qm.gainItem(1342000, 1);
			qm.gainItem(4032616, -1);
			}
			qm.sendNext("You are now a #bBlade Recruit#k. Take pride in that fact.");
			break;
	case 2:
      		qm.sendNextPrev("I've given you new equipment to lend you strength. Make good use of it.");
		break;
	case 3:
		qm.dispose();
}
}