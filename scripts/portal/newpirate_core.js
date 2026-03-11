/*
	名字:	神木村
	地圖:	尖峭的山丘
	描述:	240010300
*/

function enter(pi) {
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(53253)).getStatus() != 1) {
		return false;
		}
		pi.startportalScript("newpirate_core");
		return true;
}

var status;

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	switch (mode) {
	case -1:
		pi.dispose();
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
		pi.sendNextS("#b(WHA-AAAT?!)", 16);
		break;
	case 1:
		pi.sendNextPrevS("(#b#p9270092##k was right! It's.... the #bcore#k!)", 16);
		break;
	case 2:
		pi.sendNextPrevS("Here, I'll give you the Jett's Core. Be careful not to lose it this time.", 4, 2040050);
		break;
	case 3:
		pi.sendNextPrevS("You got the #v1492143# #b#t1492143##k I gave you, right? Enjoy it!", 4, 2040050);
		break;
	case 4:
		if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(53253)).getStatus() < 2) {
			Packages.server.quest.MapleQuest.getInstance(53253).forceComplete(pi.getPlayer(), pi.getNpc());
			pi.getPlayer().changeJob(572);
			pi.getPlayer().gainSP(1, 3);
			pi.gainEquip(1352303, -10);
			pi.gainItem(1492143, 1);
			}
			pi.sendNextPrevS("#b#p9270092##k... I woulda stayed by your side until the day we both croaked... I promise I won't let you go to that big spaceship in the sky for no reason, buddy. Nobody's gonna get their hands on this #bcore#k. Nobody.", 16);
			break;
	case 5:
		pi.dispose();
}
}