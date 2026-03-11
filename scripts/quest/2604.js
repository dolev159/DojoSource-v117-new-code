/*
	名字:	特別的才能
	地圖:	新手修練場入口
	描述:	103050910
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
		qm.sendNext("How interesting. New recruit, you didn't even bat an eyelash at Shibo's insults... It was all a setup, you see. We wanted to see how you would react. You did quite well.");
		break;
	case 1:
      		qm.sendNextPrev("You have a knack for our Dual Blade ways. #bI recommend you for the special mission!");
		break;
	case 2:	   
		qm.sendNextPrev("I can't tell you what kind of mission it is. That's up to #bLady Syl#k, IF she agrees that you're worthy. If not, you'll train the same way as everyone else. So, try not to tick Lady Syl off.");
		break;
	case 3:	
		qm.sendYesNo("When you accept, I'll send you to Lady Syl.");
		break;
	case 4:
		qm.dispose();
		qm.getPlayer().changeMap(qm.getMap(103050101), qm.getMap(103050101).getPortal(0));
		Packages.server.quest.MapleQuest.getInstance(2604).forceStart(qm.getPlayer(), qm.getNpc(), null);
}
}