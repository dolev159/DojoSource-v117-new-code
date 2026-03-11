/*
	名字:	最好的移動方法
	地圖:	大廳
	描述:	150010000
*/

var status = -1;

function end(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		if (status > 1) {
		qm.sendNext("I did not expect you to be so patient. Are you feeling well?");
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
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(25303)).getStatus() < 1) {
			Packages.server.quest.MapleQuest.getInstance(25303).forceStart(qm.getPlayer(), qm.getNpc(), null);
			qm.dispose();
			return;
			}
			qm.sendNext("Excellent timing. In celebration of you reaching Lv. 200, I prepared a gift. I hope you like it.");
			break;
	case 1:
		qm.sendNextPrev("#p1401000#! You really are the perfect butler! I was just going to tell you that I want a new car! How did you know?");
		break;
	case 2:
		qm.sendYesNo("Hehehe, I know you better than you think, but I'm glad you like it. Now then, are you ready for a drive?");
		break;
	case 3:
		Packages.server.quest.MapleQuest.getInstance(25303).forceComplete(qm.getPlayer(), qm.getNpc());
		qm.getPlayer().changeSingleSkillLevel(Packages.client.SkillFactory.getSkill(20031161), 1, 1, -1);
		qm.getClient().getSession().write(Packages.tools.packet.CWvsContext.getTopMsg("Royce Mount skill obtained!"));
		qm.sendOk("Enjoy your new vehicle. I call it Royce.");
		break;
	case 4:
		qm.dispose();
}
}