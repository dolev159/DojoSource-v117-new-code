/*
	名字:	布魯斯的請託2
	地圖:	弓箭手村
	描述:	100000000
*/

var status = -1;

function start(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		if (status == 2 || status == 5) {
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
		qm.sendNext("Here, these are the items that were in the Delivery Box... Which one do you think is the ancient mushroom spore? I can't tell.");
		break;
	case 1:
		qm.sendNextPrevS("(It must be the Mossy Mushroom from back in your day. Pick out the Mossy Mushroom Spore for him.)", 2);
		break;
	case 2:
		qm.sendSimple("So, which do you think it is? \r\n\r\n#L0##v4000011:#\r\n#L1##v4000040:#\r\n#L2##v4000437:#\r\n#L3##v4000499:#\r\n#L4##v4032389:#");
		break;
	case 3:
		if (selection != 2) {
			qm.sendNext("Hm, that can't be right. Are you sure you really know about this?");
			qm.dispose();
			return;
			}
			qm.sendNext("You think this is the ancient mushroom spore? Hmm... Yeah, I think you're on to something! Dr. #p1032104# and Dr. #p1022006# say I should trust you, so I'll get to researching this right away!");
			break;
	case 4:
		qm.sendNextPrevS("Yep, this is the ancient mushroom spore for sure.", 2);
		break;
	case 5:
		qm.sendAcceptDecline("Pretty confident, aren't you? Let's take a look... Hm, I had a spore just like this one for my last project. Great, I've got your next job.");
		break;
	case 6:
		if (qm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.ETC).getNumFreeSlot() < 1 && qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(24061)).getStatus() < 1) {
			qm.getClient().getSession().write(Packages.tools.packet.CWvsContext.serverNotice(1, "Etc item inventory is full."));
			qm.dispose();
			return;
			}
			qm.gainItem(4032965, qm.getPlayer().itemQuantity(4032965) ? 0 : 1);
			Packages.server.quest.MapleQuest.getInstance(24061).forceStart(qm.getPlayer(), qm.getNpc(), null);
			qm.sendNext("So, this ancient mushrooom spore looks a lot like a #bZombie Mushmom Spore#k. If I can get a Zombie Mushmom Spore, maybe I can learn more about the ancient spore. Mind getting one for me?");
			break;
	case 7:
		qm.sendNextPrev("Zombie Mushmoms hang around #bZombie Mushmom Hill#k. If you take this Mushroom Pheromone Perfume Bottle there, you should be able to find some right away.");
		break;
	case 8:
		qm.sendPrev("They're a little tough, but I'm sure you can handle them. Good luck!");
		break;
	case 9:
		qm.dispose();
}
}