/*
	名字:	基礎教育3
	地圖:	新手修練場入口
	描述:	103050910
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
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(2603)).getStatus() < 1) {
			Packages.server.quest.MapleQuest.getInstance(2603).forceStart(qm.getPlayer(), qm.getNpc(), null);
			qm.dispose();
			return;
			}
			qm.sendNext("Slow. Much, much too slow. Like a wilting leaf... Are you sure you have what it takes to learn to dual-wield?");
			break;
	case 1:
		qm.sendNextPrev("My insults slide like rain off your back... Hey, Ryden! What's with the new recruit?");
		break;
	case 2:
		Packages.server.quest.MapleQuest.getInstance(2603).forceComplete(qm.getPlayer(), qm.getNpc());
		qm.spawnNPCRequestController(1057001, -950, 152, 0);
		qm.gainExp(50);
		qm.dispose();
}
}