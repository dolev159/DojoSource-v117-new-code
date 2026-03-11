/*
	名字:	Some Assembly Required
	地圖:	研究所1樓走道
	描述:	261010000
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
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(53243)).getStatus() < 1) {
			Packages.server.quest.MapleQuest.getInstance(53243).forceStart(qm.getPlayer(), qm.getNpc(), null);
			qm.dispose();
			return;
			}
			qm.sendNext("W-who is it?");
			break;
	case 1:
		qm.sendNextPrevS("Relax. #p2111007# sent me.", 2);
		break;
	case 2:
		qm.sendNextPrev("Whew... I haven't been able to sleep since I took this job. I'm not built for this kind of clandestine craziness.");
		break;
	case 3:
		qm.sendNextPrevS("You seem like you've got a heaping helping of need-to-know information.", 2);
		break;
	case 4:
		qm.sendNextPrev("I fear that I do. This device I'm to build could sap the entire output of a power plant and displace it at the user's leisure. lt is an incredible power, but it is also very specific. lt makes me wonder about the stone this device is supposed to be used upon.");
		break;
	case 5:
		qm.sendNextPrev("As far as I know, there isn't anything in Maple World that would fit with the calibrations of this device. lt seems trivial to even have it made...");
		break;
	case 6:
		qm.sendNextPrevS("#b(A device for breaking a stone that isn't from Maple World? I don't like the sounds of that one bit...)", 2);
		break;
	case 7:
		qm.sendNextPrevS("You sound like you're in quite a pickle, kid, but l'm just here on an errand. Here are the materials you need.", 2);
		break;
	case 8:
		qm.sendNextPrev("Ah, thank you. Please give me a moment to work...");
		break;
	case 9:
		qm.sendNextPrev("..............");
		break;
	case 10:
		qm.sendNextPrev("Astoundingly simple recipe, this #bMatter Disassembler#k. Not that there's any way for us to test it, but it should be functional, if this book is to be believed.");
		break;
	case 11:
		Packages.server.quest.MapleQuest.getInstance(53270).forceStart(qm.getPlayer(), qm.getNpc(), 1);
		Packages.server.quest.MapleQuest.getInstance(53243).forceComplete(qm.getPlayer(), qm.getNpc());
		qm.sendNextPrevS("#b(I should get back to #p2111007# and see where this Matter Disassembler leads us.)", 2);
		break;
	case 12:
		qm.dispose();
}
}