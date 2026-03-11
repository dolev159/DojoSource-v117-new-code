/*
	名字:	Enhancing the Broken Core
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
		qm.sendNext("The #bBlue Ore#k is almost done breaking down, assuming it does not blow up and eradicate this sector. Please be patient... and pray for a long life.");
		break;
	case 1:
		qm.sendYesNo("I knew my ruminations were correct. Give me the core fragment. It's time for a new outer shell.");
		break;
	case 2:
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(53238)).getStatus() < 1) {
			Packages.server.quest.MapleQuest.getInstance(53238).forceComplete(qm.getPlayer(), qm.getNpc());
			qm.getClient().getSession().write(Packages.tools.packet.CWvsContext.getTopMsg("You obtained the Flux Field skill."));
			qm.getPlayer().changeJob(570);
			qm.getPlayer().gainSP(1, 1);
			qm.gainEquip(1352301, -10);
			qm.gainItem(1492140, 1);
			qm.removeAll(4033251);
			}
			qm.sendNext("You got the #v1492140# #b#t1492140##k I gave you, right? Enjoy it!");
			break;
	case 3:
		qm.sendNextPrev("The coating is cool and your core is much stronger. Let's see you break that now!");
		break;
	case 4:
		qm.sendPrevS("Looks like solid work! I'm already feeling closer to my old self. Good job, smithy.", 16);
		break;
	case 5:
		qm.dispose();
}
}