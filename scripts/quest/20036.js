/*
	名字:	隱藏地圖
	地圖:	雜貨商店後院
	描述:	913070050
*/

var status = -1;

function start(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		if (status > 2) {
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
		qm.sendNext("Do you see, Nineheart? This child must be the descendant of the Knight of Light.");
		break;
	case 1:
		qm.sendNextPrevS("I suppose the Empress is correct. You will have to learn the ways of a true knight, shopkeep. Your skills with a broom won't get you far on the battlenield.", 5, 1106003);
		break;
	case 2:
		qm.sendNextPrevS("My father was the Knight of Light? What does that even mean? I'm just an ordinary kid...", 2);
		break;
	case 3:
		qm.sendAcceptDecline("The choice is yours. Listen to your heart. The voice of destiny will guide you down the correct path. For the good of your own soul, and the good of the world... Will you come with me?");
		break;
	case 4:
		qm.sendNextS("You need a name. How about... #e#b'Mihile'#n#k? It means 'Bom of Light'? I think it will suit you well, in the end. Let us go to Ereve. A brilliant new life awaits you.", 1);
		break;
	case 5:
		while (qm.getPlayer().getLevel() < 10) {
			qm.getPlayer().levelUp();
			}
			qm.dispose();
			qm.gainItem(1142399, 1);
			qm.gainItem(1052444, 1);
			qm.gainItem(1302077, 1);
			qm.resetStats(35, 4, 4, 4);
			qm.getPlayer().gainSP(1, 0);
			qm.gainEquip(1098000, -10);
			qm.getPlayer().changeJob(5100);
			Packages.server.quest.MapleQuest.getInstance(20036).forceComplete(qm.getPlayer(), qm.getNpc());
			qm.getPlayer().changeMap(qm.getMap(913070071), qm.getMap(913070071).getPortal(0));
}
}