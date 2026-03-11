/*
	名字:	失去靈魂的騎士們
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
		status--;
		break;
	case 1:
		status++;
		break;
		}
	switch (status) {
	case 0:
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(20411)).getStatus() < 1) {
			Packages.server.quest.MapleQuest.getInstance(20411).forceStart(qm.getPlayer(), qm.getNpc(), null);
			qm.dispose();
			return;
			}
			qm.sendNext("Cygnus is safe and the knights will be back to normal soon. l've even heard some of them referring to you as the new Chief Knight. It looks like you have no choice but to take up my proposal.");
			break;
	case 1:
		if (qm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.EQUIP).getNumFreeSlot() < 1) {
			qm.sendNext("You'll need to empty at least #b2 slots#k in your #bEquip tab#k before you can complete your job advancement.");
			qm.dispose();
			return;
			}
			Packages.server.quest.MapleQuest.getInstance(20411).forceComplete(qm.getPlayer(), qm.getNpc());
			qm.getPlayer().changeJob(5112);
			qm.gainEquip(1098003, -10);
			qm.getPlayer().gainSP(1, 3);
			qm.gainItem(1142402, 1);
			qm.dispose();
}
}