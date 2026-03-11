/*
	名字:	正式騎士升級試煉
	地圖:	耶雷弗
	描述:	130000000
*/

var status = -1;

function end(mode, type, selection) {
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
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(20320)).getStatus() < 1) {
			Packages.server.quest.MapleQuest.getInstance(20320).forceStart(qm.getPlayer(), qm.getNpc(), null);
			qm.dispose();
			return;
			}
			qm.sendYesNo("Now you're a REAL knight. Would you like to take your Job Advancement?");
			break;
	case 1:
		if (qm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.EQUIP).getNumFreeSlot() < 1) {
			qm.sendNext("I have something to give you, but your bag is full. Please talk to me again after emptying at least #b2 slots#k in your #bEquip tab#k.");
			qm.dispose();
			return;
			}
			Packages.server.quest.MapleQuest.getInstance(20320).forceComplete(qm.getPlayer(), qm.getNpc());
			qm.getPlayer().changeJob(5111);
			qm.gainEquip(1098002, -10);
			qm.getPlayer().gainSP(1, 2);
			qm.gainItem(1142401, 1);
			qm.dispose();
}
}