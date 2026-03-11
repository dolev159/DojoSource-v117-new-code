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
		if (qm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.ETC).getNumFreeSlot() < 1) {
			qm.getClient().getSession().write(Packages.tools.packet.CWvsContext.serverNotice(1, "Etc item inventory is full."));
			qm.dispose();
			return;
			}
			qm.gainItem(4032511, qm.getPlayer().itemQuantity(4032511) ? 0 : 1);
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
		qm.sendNextPrevS("(When you press the button, you feel as if you're being pulled far away...and you hear a strange voice .)", 3);
		break;
	case 9:
		qm.sendNextPrevS("Did you...activate the watch?", 1);
		break;
	case 10:
		qm.sendNextPrevS("...Who are you? Are...you the person who dropped the watch?", 3);
		break;
	case 11:
		qm.sendNextPrevS("Yes. My name is Andy, and you are in the Tera Forest Time Gate Now, tell me. Are you the one who activated the watch?", 1);
		break;
	case 12:
		qm.sendNextPrevS("Yes, the watch wasn't working, so I tried the button on top, and all of a sudden I ended up here. What's going on?", 3);
		break;
	case 13:
		qm.sendNextPrevS("How could this be? I had thought the watch was out of power... We will soon be able to meet, but for now, I must take back the watch. You'll probably be feeling a bit queasy right about now, so talk to me again when you are feeling better.", 1);
		break;
	case 14:
		qm.dispose();
		qm.gainExp(99190);
		qm.gainItem(4032511, -1);
		Packages.server.quest.MapleQuest.getInstance(3715).forceComplete(qm.getPlayer(), qm.getNpc());
		qm.getPlayer().changeMap(qm.getMap(240070000), qm.getMap(240070000).getPortal(0));
}
}