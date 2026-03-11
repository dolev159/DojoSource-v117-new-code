/*
	名字:	秘書樂帝艾2
	地圖:	發電廠大廳
	描述:	310050000
*/

var status = -1;

function end(mode, type, selection) {
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
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(25416)).getStatus() < 1) {
			Packages.server.quest.MapleQuest.getInstance(25416).forceStart(qm.getPlayer(), qm.getNpc(), null);
			qm.dispose();
			return;
			}
			qm.sendNextS("I knew it was a trap. The Black Wings aren't the type of fools to just promote people off the street.", 16);
			break;
	case 1:
		qm.sendNextPrevS("But what did I do to make them suspicious? lt couldn't have been #p2154002#... perhaps the other watchmen got suspicious? I guess I look a little bit suspicious...", 16);
		break;
	case 2:
		qm.sendNextPrevS("Regardless, no one can capture the greatest thief of all time in a simple trap! Especially when that very thief owns the #m150000000#! I've gotta get out of here! \r\n\r\n#fUI/UIWindow.img/QuestIcon/8/0# 3200 exp", 16);
		break;
	case 3:
		qm.dispose();
		qm.gainExp(3200);
		Packages.server.quest.MapleQuest.getInstance(25416).forceComplete(qm.getPlayer(), qm.getNpc());
		qm.getPlayer().changeMap(qm.getMap(150000000), qm.getMap(150000000).getPortal(1));
}
}