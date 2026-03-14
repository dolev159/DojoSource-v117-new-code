/*
	名字:	覆蓋著雪的峽谷
	地圖:	峽谷深處
	描述:	956040100
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
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(1741)).getStatus() < 1) {
			Packages.server.quest.MapleQuest.getInstance(1741).forceStart(qm.getPlayer(), qm.getNpc(), null);
			qm.dispose();
			return;
			}
			qm.dispose();
}
}