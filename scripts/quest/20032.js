/*
	名字:	搬移閣樓房間的東西
	地圖:	林伯特家的雜貨店
	描述:	913070002
*/

var status = -1;

function end(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		if (status < 1) {
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
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(20032)).getStatus() < 1) {
			Packages.server.quest.MapleQuest.getInstance(20032).forceStart(qm.getPlayer(), qm.getNpc(), null);
			qm.dispose();
			return;
			}
			qm.sendNext("Are you done cleaning yet? I suppose it looks moderately presentable in here. What are you looking at? Go organize the shelves!");
			break;
	case 1:
		qm.dispose();
		qm.gainExp(92);
		qm.gainExp(135);
		//qm.getPlayer().levelUp();
		qm.gainItem(2000016, 10);
		qm.gainItem(2000018, 10);
		Packages.server.quest.MapleQuest.getInstance(20032).forceComplete(qm.getPlayer(), qm.getNpc());
		qm.getPlayer().changeMap(qm.getMap(913070003), qm.getMap(913070003).getPortal(0));
}
}