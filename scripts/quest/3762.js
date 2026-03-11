/*
	名字:	安迪
	地圖:	泰拉森林時空之門
	描述:	240070000
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
		status--;
		break;
	case 1:
		status++;
		break;
		}
	switch (status) {
	case 0:
		qm.sendNext("......");
		break;
	case 1:
		qm.sendNextPrevS("(Someone bumps into you as they pass.)", 2);
		break;
	case 2:
		qm.sendNextPrevS("Hey! Watch where you're going!", 2);
		break;
	case 3:
		qm.sendYesNo("... \r\n\r\n(It seems the man dropped something as he passed. Maybe you should see what it is?)");
		break;
	case 4:
		qm.sendNextS("(When you take a closer look, you see that the object is a Pocket Watch. There's nothing odd about it. though the hands aren't moving and the name #bAndy#k is engraved on the back.)", 2);
		break;
	case 5:
		qm.sendNextPrevS("Perhaps pressing the large button on the top will make the watch run again.", 2);
		break;
	case 6:
		qm.sendYesNoS("Would you like to press the button on the watch? \r\n\r\n#b(Pressing #rYes #bwill teleport you to the Tera Forast Time Gate.)", 4);
		break;
	case 7:
		qm.sendNextS("(You've decided to press the button.)", 3);
		break;
	case 8:
		qm.dispose();
		Packages.server.quest.MapleQuest.getInstance(3762).forceStart(qm.getPlayer(), qm.getNpc(), null);
		qm.getPlayer().changeMap(qm.getMap(240070000), qm.getMap(240070000).getPortal(0));
}
}