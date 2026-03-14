/*
	名字:	雪山的遇難者
	地圖:	峽谷深處
	描述:	956040000
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
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(1740)).getStatus() < 1) {
			Packages.server.quest.MapleQuest.getInstance(1740).forceStart(qm.getPlayer(), qm.getNpc(), null);
			qm.dispose();
			return;
			}
			qm.sendNextS("Looks like these Thick Branches will be dry enough to make a decent fire. Time to light it up!", 17);
			break;
	case 1:
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(1740)).getStatus() < 2) {
			Packages.server.quest.MapleQuest.getInstance(1740).forceComplete(qm.getPlayer(), qm.getNpc());
			qm.gainItem(4033215, -5);
			qm.gainExp(718);
			}
			qm.sendNextPrevS("FIRE! YES!", 17);
			break;
	case 2:
		qm.dispose();
}
}