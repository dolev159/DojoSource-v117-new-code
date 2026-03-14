/*
	名字:	遺失物
	地圖:	埃德爾斯坦
	描述:	956010100
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
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(1712)).getStatus() < 1) {
			Packages.server.quest.MapleQuest.getInstance(1712).forceStart(qm.getPlayer(), qm.getNpc(), null);
			qm.dispose();
			return;
			}
			qm.sendSimple("Did you get it?! I NEED IT! \r\n\r\n#L0##bRelax! Here, take the Delivery Box!#l");
			break;
	case 1:
		qm.gainExp(6832);
		qm.gainItem(4033201, -3);
		Packages.server.quest.MapleQuest.getInstance(1712).forceComplete(qm.getPlayer(), qm.getNpc());
		qm.sendNext("Wait, wait, wait! l have to see what's in the box!");
		break;
	case 2:
		qm.dispose();
}
}