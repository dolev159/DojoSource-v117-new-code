/*
	名字:	取得食物吧
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
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(1742)).getStatus() < 1) {
			Packages.server.quest.MapleQuest.getInstance(1742).forceStart(qm.getPlayer(), qm.getNpc(), null);
			qm.dispose();
			return;
			}
			qm.sendNextS("I must be hungry, because this meat looks amazing. Just... just one bite...", 17);
			break;
	case 1:
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(1742)).getStatus() < 2) {
			Packages.server.quest.MapleQuest.getInstance(1742).forceComplete(qm.getPlayer(), qm.getNpc());
			qm.gainItem(4033216, -10);
			qm.gainExp(14374);
			}
			qm.sendNextPrevS("Delicious! Like an explosion of happy in my mouth!!", 17);
			break;
	case 2:
		qm.getPlayer().changeMap(qm.getMap(956040200), qm.getMap(956040200).getPortal(0));
		qm.dispose();
}
}