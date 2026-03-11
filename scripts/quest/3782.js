/*
	名字:	回去的時間
	地圖:	碼頭&amp;lt;前往天空之城&gt;
	描述:	240000110
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
		qm.sendNext("It was such a mysterious story. Grandma met an Explorer when she was young. And that Explorer told her about the Black Mage's Seal, as he left for the Temple of Time.");
		break;
	case 1:
		qm.sendNextPrevS("The Black Mage...?! What does the Power of Time have to do with that Seal?", 2);
		break;
	case 2:
		qm.sendNextPrev("The Black Mage's Seal was made by Freud, one of the five heroes, and Afrien, the king of the Onyx Dragons. Freud and Afrien poured all of their magic powers into creating that seal. As an extra measure of caution, Afrien made it so that the seal could stop time itself.");
		break;
	case 3:
		qm.sendNextPrevS("So, you're saying that time itself was sealed off??", 2);
		break;
	case 4:
		qm.sendNextPrev("You could say that. The timestream was sort of... tied off at the precise moment the seal was created. No one could go back in time before the seal was created, even someone who was otherwise able to move through time. It was a powerful spell.");
		break;
	case 5:
		qm.sendNextPrevS("(Maybe everything that's happened to #p2082004# was caused by the Black Mage's Seal... Hey! The Time Diver is all lit up again!)", 2);
		break;
	case 6:
		qm.dispose();
		qm.getPlayer().changeMap(qm.getMap(240070000), qm.getMap(240070000).getPortal(0));
		Packages.server.quest.MapleQuest.getInstance(3782).forceStart(qm.getPlayer(), qm.getNpc(), null);
}
}