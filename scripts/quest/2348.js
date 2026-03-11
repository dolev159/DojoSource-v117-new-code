/*
	名字:	危機的菇菇國王
	地圖:	耶雷弗
	描述:	130000000
*/

var status = -1;

function start(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		if (type == 2) {
		qm.dispose();
		return;
		}
		if (type == 15) {
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
		qm.sendAcceptDecline("Uh, Master, are you busy? Could you please spare me a few moments, if you have the time? It wil be quick. Please?");
		break;
	case 1:
		qm.sendNext("Master, have you ever heard of the Mushking Empire? It is a kingdom of mushrooms just south west of Henesys. This small and peaceful kingdom of mushrooms is under siege.");
		break;
	case 2:
		qm.sendNextPrevS("(A kingdom of mushrooms? Monsters are making kingdoms now? The world has changed quite a bit )", 2);
		break;
	case 3:
		qm.sendNextPrev("They say that the sneaky Prime Minister staged a coup, while the Mushking was bed-ridden. He has even taken the Mushking Princess hostage in the process to overthrow the king!");
		break;
	case 4:
		qm.sendNextPrev("It's so sad... those cute little mushrooms are in trouble. So, I was wondering... do you think you could help them out? I'm confident that you have the ability to help them.");
		break;
	case 5:
		qm.sendNextPrevS("(I could care less what happens to the Mushking Empire, but Madeleine seems to be truly concerned. She must really like mushrooms... for some reason.)", 2);
		break;
	case 6:
		qm.sendYesNo("I understand that you are really busy with your training. But helping them might shed some light on your quest to regain your old strength. Would you please help them?");
		break;
	case 7:
		if (qm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.ETC).getNumFreeSlot() < 1) {
			qm.getClient().getSession().write(Packages.tools.packet.CWvsContext.serverNotice(1, "Etc item inventory is full."));
			qm.dispose();
			return;
			}
			qm.gainItem(4032375, qm.getPlayer().itemQuantity(4032375) ? 0 : 1);
			Packages.server.quest.MapleQuest.getInstance(2348).forceStart(qm.getPlayer(), qm.getNpc(), null);
			qm.sendNext("Oh, you are going to help them? Thank you! Here, take this Recommendation Letter - job instructor to get started. You can take it to the Mushking Empire right away. Oh, and l also had a Scroll that would take you to the Mushking Empire directly. If l could just remember where I put it.");
			break;
	case 8:
		qm.sendYesNo("Here it is! This Scroll will take you to the entrance of the Mushking Empire. If you accept. I'll send you there right now. And if you don't want it, I might use it to vist the mushroom people myself!");
		break;
	case 9:
		qm.dispose();
		qm.getPlayer().changeMap(qm.getMap(106020001), qm.getMap(106020001).getPortal(0));
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
		qm.sendNext("Huh? Recommendation Letter from a job instructor! What's this? You're the one sent here to save our Mushking Kingdom?");
		break;
	case 1:
		qm.sendNextPrevS("Y...Yesss?", 3);
		break;
	case 2:
		qm.sendNextPrev("Hmm, I see. Well, if a job instructor recommended you, I will put my trust in you as well. I apologize for my late introduction. I am the #bHead Security Officer#k in charge of the royal family's security. As you can see, I am currently in charge of security over this temporary housing and the key figures inside. We're not in the best of situations, but nevertheless, let me welcome you to the Mushking Empire.");
		break;
	case 3:
		Packages.server.quest.MapleQuest.getInstance(2348).forceComplete(qm.getPlayer(), qm.getNpc());
		Packages.server.quest.MapleQuest.getInstance(2311).forceStart(qm.getPlayer(), qm.getNpc(), 1);
		qm.gainItem(4032375, -1);
		qm.gainExp(1200);
		qm.dispose();
}
}