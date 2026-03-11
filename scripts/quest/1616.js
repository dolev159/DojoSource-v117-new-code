/*
	名字:	[十字獵人]雪麗的提議
	地圖:	補給品倉庫
	描述:	931050500
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
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(1616)).getStatus() < 1) {
			Packages.server.quest.MapleQuest.getInstance(1616).forceStart(qm.getPlayer(), qm.getNpc(), null);
			qm.dispose();
			return;
			}
			qm.sendNext("I've been expecting you! Come, let's go somewhere where we can speak in private.");
			break;
	case 1:
		Packages.server.quest.MapleQuest.getInstance(1616).forceComplete(qm.getPlayer(), qm.getNpc());
		qm.getPlayer().changeMap(qm.getMap(931050500), qm.getMap(931050500).getPortal(0));
		qm.gainExp(37425);
		qm.dispose();
}
}