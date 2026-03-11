/*
	名字:	無法相信的事實
	地圖:	勇士之村南部-雷神之錘的帳篷
	描述:	913070400
*/

var status = -1;

function start(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		if (status < 3) {
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
		qm.sendSimple("Ugh... I knew I shouldn't have taken you so lightly. You're Chromile's kid? \r\n\r\n#L0##bWho are you? Why did you attack me?#l");
		break;
	case 1:
		qm.sendSimple("Aww, you don't remember me? Hahaha, you were just a little kid... \r\n\r\n#L0##bY-you... you're the ones who killed my mother!#l");
		break;
	case 2:
		qm.sendSimple("Your old man had a chance to stop everything. All he had to do was show up and we woulda let her go, but he was too much of a coward. \r\n\r\n#L0##bThat's not true. That's impossible!#l");
		break;
	case 3:
		qm.sendNextS("Guess I hit a nerve there. Believe what you want, kid, but your dad was too much of a wimp to save his wife. Judging from that fight, I guess you take after him. Tell you what. I'll just take off now and you can stay here with the fact that your dad let your mom die. Sound good? Hahahaha! #b(The Unidentified Assailant escaping through the Ghost Stumps! Stop him!)", 1);
		break;
	case 4:
		qm.dispose();
		Packages.server.quest.MapleQuest.getInstance(20785).forceStart(qm.getPlayer(), qm.getNpc(), null);
		qm.getPlayer().changeMap(qm.getMap(102020500), qm.getMap(102020500).getPortal(0));
		qm.getClient().getSession().write(Packages.tools.packet.CWvsContext.getTopMsg("Examine Jr Boogie to find any trace of the suspicious fellow!"));
		qm.getClient().getSession().write(Packages.tools.packet.CWvsContext.getTopMsg("A suspicious fellow ran through Jr Boogie!"));
}
}