/*
	名字:	聞到味道的野狼
	地圖:	峽谷深處
	描述:	956040200
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
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(1743)).getStatus() < 1) {
			Packages.server.quest.MapleQuest.getInstance(1743).forceStart(qm.getPlayer(), qm.getNpc(), null);
			qm.dispose();
			return;
			}
			qm.sendNextS("Whew... they caught me off guard, but I was too awesome.", 17);
			break;
	case 1:
		Packages.server.quest.MapleQuest.getInstance(1743).forceComplete(qm.getPlayer(), qm.getNpc());
		qm.gainExp(14374);
		qm.dispose();
}
}