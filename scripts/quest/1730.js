/*
	名字:	為了噴火龍蛋的巢穴
	地圖:	孵化室
	描述:	956030000
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
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(1730)).getStatus() < 1) {
			Packages.server.quest.MapleQuest.getInstance(1730).forceStart(qm.getPlayer(), qm.getNpc(), null);
			qm.dispose();
			return;
			}
			qm.sendSimple("Did you bring the items for this little egg's nest? \r\n\r\n#L0##bYes, here are 10#k of the #bCozy Eeather you asked for.#l");
			break;
	case 1:
		qm.gainExp(6832);
		qm.gainItem(4033202, -10);
		Packages.server.quest.MapleQuest.getInstance(1730).forceComplete(qm.getPlayer(), qm.getNpc());
		qm.sendNext("Yes, these should be warm and cuddly.");
		break;
	case 2:
		qm.dispose();
}
}