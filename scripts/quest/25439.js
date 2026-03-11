/*
	名字:	黑暗中的史烏
	地圖:	情報室
	描述:	150010200
*/

var status = -1;

function start(mode, type, selection) {
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
		qm.sendNext("I got the results from that on #m310000000#, where the energy is gathering. It's coming from the Power Plant inside the mines and it all seems to be funneling into one place...");
		break;
	case 1:
		qm.sendNextPrev("There are some rumors that Orchid's Room is deep inside the Power Plant. It's just a rumor, but I could look into it if you want.");
		break;
	case 2:
		qm.sendNextPrevS("No need, #p1401001#. I'll go myself. lf #p1404007# is there, I want to be there to catch him.", 2);
		break;
	case 3:
		qm.sendNextPrev("Captain! It might be really dangerous! The #m310000000# mines are full of powerful monsters. I don't think you should go charging in there for some unsubstantiated rumor.");
		break;
	case 4:
		qm.sendNextPrevS("My gut tells me it's something more. Besides, if #p1404007# isn't there, I can at least go take down Orchid.", 2);
		break;
	case 5:
		qm.sendNextPrev("Why are you in such a hurry? You're acting weird.");
		break;
	case 6:
		qm.sendNextPrevS("You don't know me as well as you think you do. I will do what needs to be done.", 2);
		break;
	case 7:
		qm.sendNextPrev("Th-that's not what I was trying to say! Just... be careful, captain.");
		break;
	case 8:
		Packages.server.quest.MapleQuest.getInstance(25439).forceStart(qm.getPlayer(), qm.getNpc(), null);
		qm.dispose();
}
}