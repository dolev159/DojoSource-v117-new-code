/*
	名字:	隱密的訂單
	地圖:	埃德爾斯坦
	描述:	956010100
*/

var status = -1;

function end(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		if (type == 5) {
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
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(1710)).getStatus() < 1) {
			Packages.server.quest.MapleQuest.getInstance(1710).forceStart(qm.getPlayer(), qm.getNpc(), null);
			qm.dispose();
			return;
			}
			qm.sendSimple("Enter the phone number you want to dial. \r\n(If you don't know the number, check Spiegelmann's Note.) \r\n\r\n#L0##b1123#l\r\n#L1#1213#l\r\n#L2#3112#l");
			break;
	case 1:
		qm.sendSimple("Greetings from Big Ed's Moustache Emporium! If your name is Spiegelmann, press 1 to place your regular order. Otherwise, press 2 to figure out why you're even calling in the first place. \r\n\r\n#L0##b1#l\r\n#L1#2#l");
		break;
	case 2:
		if (selection == 1) {
			qm.sendNext("Sorry, bub, but you aren't a Big Ed's regular!");
			qm.dispose();
			return;
			}
			qm.sendNextS("This is a public phone... how did they know it was for Spiegelmann?", 2);
			break;
	case 3:
		qm.sendSimple("lf you're trying to order another Spiegelmann's Moustache, please press 1. If you wanna order something else, press 2. \r\n\r\n#L0##b1#l\r\n#L1#2#l");
		break;
	case 4:
		if (selection == 1) {
			qm.sendNext("Really? Wow, this has never happened... uh... I guess we have a half-eaten sandwich here if you really want it...");
			qm.dispose();
			return;
			}
			Packages.server.quest.MapleQuest.getInstance(1710).forceComplete(qm.getPlayer(), qm.getNpc());
			qm.sendOk("Thanks, Mr. Spiegelmann! Without you, we'd be out of business. We'll send your delivery out right away!");
			break;
	case 5:
		qm.dispose();
}
}