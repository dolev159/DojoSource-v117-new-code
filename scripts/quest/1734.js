/*
	名字:	照顧幼虎1
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
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(1734)).getStatus() < 1) {
			Packages.server.quest.MapleQuest.getInstance(1734).forceStart(qm.getPlayer(), qm.getNpc(), null);
			qm.dispose();
			return;
			}
			qm.sendSimple("You are just covered in Nependeath goo. \r\n\r\n#L0##bI sure am. But I got what you wanted.#l");
			break;
	case 1:
		qm.gainExp(13664);
		qm.gainItem(4033206, -5);
		Packages.server.quest.MapleQuest.getInstance(1734).forceComplete(qm.getPlayer(), qm.getNpc());
		qm.sendNext("The air's gonna be great in here!");
		break;
	case 2:
		qm.dispose();
}
}