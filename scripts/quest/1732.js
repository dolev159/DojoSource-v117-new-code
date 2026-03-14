/*
	名字:	需要維持溫度！
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
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(1732)).getStatus() < 1) {
			Packages.server.quest.MapleQuest.getInstance(1732).forceStart(qm.getPlayer(), qm.getNpc(), null);
			qm.dispose();
			return;
			}
			qm.sendSimple("Oh, perfect. PERFECT! You truly are amazing. What a beautifully warm and fluffy bed these will make! \r\n\r\n#L0##bUh, yeah, I did.#l");
			break;
	case 1:
		qm.gainExp(10248);
		qm.gainItem(4033204, -10);
		Packages.server.quest.MapleQuest.getInstance(1732).forceComplete(qm.getPlayer(), qm.getNpc());
		qm.sendNext("Hatch, hatch, hatch! HATCH YOU CRAZY EGG, HATCH!");
		break;
	case 2:
		qm.dispose();
}
}