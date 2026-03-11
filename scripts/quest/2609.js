/*
	名字:	基礎教育3
	地圖:	新手修練場入口
	描述:	103050910
*/

var status = -1;

function end(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		if (status == 3) {
		qm.sendNext("I can see you're not prepared yet...");
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
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(2609)).getStatus() < 1) {
			Packages.server.quest.MapleQuest.getInstance(2609).forceStart(qm.getPlayer(), qm.getNpc(), null);
			qm.dispose();
			return;
			}
			qm.sendNext("#h0#, you look rather... green. Are you ill? Oh, you're poisoned? ls that what Ryden told you?");
			break;
	case 1:
		qm.sendNextPrev("That drink was just apple juice. Couldn't you tell? Ryden was just making a point, you see...");
		break;
	case 2:
		qm.sendNextPrev("Don't even THINK about betraying us. The Dual Blades do not forgive their enemies...");
		break;
	case 3:
		qm.sendYesNo("The look in your eyes, the lift in your shoulders. You seem ready. Do you want to advance to #bRogue#k? Once you do, you can begin your REAL missions.");
		break;
	case 4:
		if (qm.getPlayer().getLevel() < 10) {
			qm.sendOk("Please talk to me again after reaching level 10.");
			qm.dispose();
			return;
			}
		if (qm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.EQUIP).getNumFreeSlot() < 2) {
			qm.sendOk("I want to give you a gift for your job advancement, so talk to me after emptying #b2 slots#k in your #bEquip tab#k.");
			qm.dispose();
			return;
			}
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(2609)).getStatus() < 2) {
			Packages.server.quest.MapleQuest.getInstance(2609).forceComplete(qm.getPlayer(), qm.getNpc());
			qm.getPlayer().changeJob(400);
			qm.resetStats(4, 25, 4, 4);
			qm.expandInventory(1, 4);
			qm.expandInventory(4, 4);
			qm.gainItem(1332063, 1);
			}
			qm.sendNextS("You're not a Thief, and you haven't learned any Dual Blade skills yet. But you should be able to approach the Dark Lord as our spy.", 1);
			break;
	case 5:
		qm.sendNextPrevS("Dual Blades and Thieves value the same stats, specifically LUK, with DEX as a secondary. Use the #bAuto-Assign#k feature if you're unsure how to allocate your stats.", 1);
		break;
	case 6:
		qm.sendNextPrevS("Spies need a lot of gear, so I've increased your Equip and Etc. tab slots.", 1);
		break;
	case 7:
		qm.sendNextPrevS("I've also given you a new weapon. It's much better than the one you've been using.", 1);
		break;
	case 8:
		qm.sendNextPrevS("That's all from me. Ryden will fill you in on the details. I look forward to your success.", 1);
		break;
	case 9:
		qm.spawnNPCRequestController(1057001, 489, 42, 0);
		qm.dispose();
}
}