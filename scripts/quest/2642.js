/*
	名字:	上忍之路2
	地圖:	雪姬的房間
	描述:	103050101
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
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(2642)).getStatus() < 1) {
			Packages.server.quest.MapleQuest.getInstance(2642).forceStart(qm.getPlayer(), qm.getNpc(), null);
			qm.dispose();
			return;
			}
		if (qm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.EQUIP).getNumFreeSlot() < 1) {
			qm.sendOk("Empty at least #bone Equip slot#k before you advance to Blade Specialist.");
			qm.dispose();
			return;
			}
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(2642)).getStatus() < 2) {
			Packages.server.quest.MapleQuest.getInstance(2642).forceComplete(qm.getPlayer(), qm.getNpc());
			qm.getPlayer().changeJob(432);
			qm.gainItem(1132021, 1);
			}
			qm.sendNext("You are now a Blade Specialist.");
			break;
	case 1:
      		qm.sendNextPrev("Well, look at you. I remember back when Ryden told me you had potential. Honestly, I didn't quite believe him. but he proved me wrong.");
		break;
	case 2:
      		qm.sendNextPrev("How ironic. You've grown so strong, and I, well, I feel smaller somehow.");
		break;
	case 3:
      		qm.sendNextPrev("Sometimes, I wonder how my father would've handled all this, if he were still leading the Thieves...");
		break;
	case 4:
      		qm.sendNextPrev("'#rDual Blades use two weapons so they're better equipped to protect others.#k' Father always used to remind me of that.");
		break;
	case 5:
      		qm.sendPrev("I'm sorry. I'm rambling. Give me a moment to organize my thoughts.");
		break;
	case 6:
		qm.dispose();
}
}