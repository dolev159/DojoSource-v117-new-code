/*
	名字:	須勒
	地圖:	2次轉職
	描述:	931000100
*/

var status;

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	switch (mode) {
	case -1:
		cm.dispose();
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
		cm.sendNextS("Oh my. what's this? I gave specific instructions to make sure no one else used the airport at this time... But, I say, are you a member of the Resistance?", 8);
		break;
	case 1:
		cm.sendNextPrevS("#b(You are surprised Schiller doesn't immediately recognize you. You certainly remember him.)", 2);
		break;
	case 2:
		cm.sendNextPrevS("Come to think of it, you do look familiar... Where have I seen you before?", 8);
		break;
	case 3:
		cm.sendNextPrevS("I couldn't fight you the last time we met, but I plan to fix that today.", 2);
		break;
	case 4:
		cm.sendNextPrevS("You! I remember now! You stole that one test subject! Do you have any idea how much I suffered because of that? I was demoted...five times! Now I'm stuck doing menial jobs like this. Time for you to pay. oh yes.", 8);
		break;
	case 5:
		cm.removeNpc(cm.getPlayer().getMap().getId(), cm.getNpc());
		cm.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(9001031), new java.awt.Point(181, -14));
		cm.getClient().getSession().write(Packages.tools.packet.CWvsContext.serverNotice(5, "Defeat Schiller and take the Report!"));
		cm.getClient().getSession().write(Packages.tools.packet.CWvsContext.getTopMsg("Defeat Schiller and take the Report!"));
		cm.dispose();
}
}