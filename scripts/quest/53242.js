/*
	名字:	Secret Trade Request
	地圖:	瑪迦提亞城
	描述:	261000000
*/

var status = -1;

function start(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		if (status == 4) {
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
		qm.sendNext("#h0#, I need your help! I have a deadline right around the corner and my client is breathing down my neck.");
		break;
	case 1:
		qm.sendNextPrevS("#p2111007#? What kind of low-down scheme are you running now?", 2);
		break;
	case 2:
		qm.sendNextPrev("No scheme! l swear it. But I need someone with a littie discretion. No one on the outside must know. Will you help me?");
		break;
	case 3:
		qm.sendNextPrevS("Spill the beans and I'll think about it.", 2);
		break;
	case 4:
		qm.sendYesNo("I can't tell you anything untill you agree to help. I swear I will make it worth you while. What do you say?");
		break;
	case 5:
		qm.sendNext("I had a feeling you couldn't resist a good surprise.");
		break;
	case 6:
		qm.sendNextPrev("A couple of days ago, I received an order from a secret organization.");
		break;
	case 7:
		qm.sendNextPrev("And you don't want anybody to know what you're cooking up?");
		break;
	case 8:
		qm.sendNextPrev("I prefer to keep my trade secrets to myself. The client asked me to make a Matter Disassembler, based on an old alchemy manuscript he found. The pay is VERY handsome.");
		break;
	case 9:
		qm.sendNextPrevS("(Matter Disassembler? That sounds like a dangerous thing to have...)", 2);
		break;
	case 10:
		qm.sendNextPrevS("The client... you know him?", 2);
		break;
	case 11:
		qm.sendNextPrev("No, I don't know him and I do not wish to! I need the ingredients and I need them immediately. The recipe calls for #b50#k sets of a #b#t4000357##k. a #b#t4000358##k, and #b#t4000364##k bound together with magic. You will need to attack #r#o4110300#, #o4110301##k. and #r#o5110301##k machines to find them. Make sure no one sees you!");
		break;
	case 12:
		qm.sendNextPrevS("#b(This client sounds like somebody I oughtta set eyes on...)", 2);
		break;
	case 13:
		qm.dispose();
		Packages.server.quest.MapleQuest.getInstance(53242).forceStart(qm.getPlayer(), qm.getNpc(), null);
}
}