/*
	名字:	優秀社會人士
	地圖:	維多利亞港
	描述:	104000000
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
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(29508)).getStatus() < 1) {
			Packages.server.quest.MapleQuest.getInstance(29508).forceStart(qm.getPlayer(), qm.getNpc(), null);
			qm.dispose();
			return;
			}
		if (qm.getPlayer().getMarriageId() < 1 || qm.getPlayer().getGuildId() < 1 || qm.getPlayer().getJunior1() < 1) {
			qm.sendOk("\n- Wedding " + (qm.getPlayer().getMarriageId() > 0 ? "#b(Completion)#k" : "#r(Before Completion)#k") + "\r\n\n- Join a Guild" + (qm.getPlayer().getGuildId() > 0 ? "#b(Completion)#k" : "#r(Before Completion)#k") + "\r\n\n-Get a Junior " + (qm.getPlayer().getJunior1() > 0 ? "#b(Completion)#k" : "#r(Before Completion)#k"") + " \r\nYou still lack some qualities that make up an #bOutstanding Citizen#k. Come back when you're ready.");
			qm.dispose();
			return;
			}
		if (qm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.EQUIP).getNumFreeSlot() < 1) {
			qm.sendOk("Talk to me after you make room in the Equip window of your ltem Inventory.");
			qm.dispose();
			return;
			}
			qm.gainItem(1142081, 1);
			Packages.server.quest.MapleQuest.getInstance(29508).forceComplete(qm.getPlayer(), qm.getNpc());
			qm.sendNext("\n- Wedding #b(Completion)#\r\n\n- Join a Guild().getGuildId() > 0 ? "#b(Completion)#k"\r\n\n-Get a Junior #b(Completion)#k \r\nYou are now an Outstanding Citizen. Continue to stay active in the community.");
			break;
	case 1:
		qm.dispose();
}
}