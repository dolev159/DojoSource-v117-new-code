/*
	名字:	Cracked Core
	地圖:	Master Forge
	描述:	552000071
*/

var status = -1;

function start(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		if (status == 2) {
		qm.dispose();
		return;
		}
		if (status == 10) {
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
		qm.sendNext("Ah, #b#h0##k I'm sure your core is better than it ever was My calculations must have improved it ten--");
		break;
	case 1:
		qm.sendNextPrevS("It's a mess, Thunder Hammer. I was coming to see you.", 16);
		break;
	case 2:
		qm.sendYesNo("Are you trying to tell me that you broke the item I so perfectly fixed for you?");
		break;
	case 3:
		qm.sendNextS("It's been stable for a while, but I've noticed a lot more cracks showing up lately under the strain...", 16);
		break;
	case 4:
		qm.sendNextPrev("Blast it! #bBlue Ore#k isn't strong enough to handie the power output on this device! l should have known... You are going to need a much stronger compound to channel that energy.");
		break;
	case 5:
		qm.sendNextPrevS("Can we do something about it?", 16);
		break;
	case 6:
		qm.sendNextPrev("Of course it can! A smithy always finds a way. But we will need stronger bonding agents to harden the coating...");
		break;
	case 7:
		qm.sendNextPrevS("What do we need? I'm not about to let the core break again.", 16);
		break;
	case 8:
		qm.sendNextPrev("#bFire Ore#k has some very unique strengthening properties. It develops in the #bBlast Furnace#k, but it's quite hard to get in proper quantities...");
		break;
	case 9:
		qm.sendNextPrevS("I'll head into the Blast Furnace. What's a little furnace gonna do to me that space hasn't already?", 16);
		break;
	case 10:
		qm.sendAcceptDecline("A foolish anecdote at best, but I'm sure you know your limits. Remember to take enough potions, because if you have to quit before you succeed, #byou must forfeit the quest and start again.");
		break;
	case 11:
		qm.dispose();
		Packages.server.quest.MapleQuest.getInstance(53239).forceStart(qm.getPlayer(), qm.getNpc(), null);
		qm.getPlayer().changeMap(qm.getMap(552000073), qm.getMap(552000073).getPortal(0));
}
}

function end(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		if (status == 1) {
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
		qm.sendNext("Ooh, #bFire Ore#k! I could produce a ternary alloy from this that would break diamonds!");
		break;
	case 1:
		qm.sendYesNo("All right, it looks like the materials have been prepared. Could you give me the core fragment?");
		break;
	case 2:
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(53239)).getStatus() < 2) {
			Packages.server.quest.MapleQuest.getInstance(53239).forceComplete(qm.getPlayer(), qm.getNpc());
			qm.getPlayer().changeJob(571);
			qm.getPlayer().gainSP(1, 2);
			qm.gainEquip(1352302, -10);
			qm.gainItem(1492142, 1);
			qm.removeAll(4033252);
			}
			qm.sendNext("You got the #v1492142# #b#t1492142##k I gave you, right? Enjoy it!");
			break;
	case 3:
		qm.sendNextPrev("My masterpiece is complete! The #bFire Ore#k alloy should make it nigh indestructible!");
		break;
	case 4:
		qm.sendPrevS("#b(The Fire Ore's heat energy has mingled with the core. This thing is ready to do some damage!)", 16);
		break;
	case 5:
		qm.dispose();
}
}