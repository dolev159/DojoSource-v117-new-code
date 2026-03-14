/*
	名字:	為了她的禮物2
	地圖:	宮殿後走廊
	描述:	956020000
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
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(1724)).getStatus() < 1) {
			Packages.server.quest.MapleQuest.getInstance(1724).forceStart(qm.getPlayer(), qm.getNpc(), null);
			qm.dispose();
			return;
			}
			qm.gainExp(14374);
			qm.gainItem(4033213, -1);
			Packages.server.quest.MapleQuest.getInstance(1724).forceComplete(qm.getPlayer(), qm.getNpc());
			qm.sendOk("Oh, oooh! Look at these jewels! They sure look like Queen Areda's eyes! These will be perfect for her!");
			break;
	case 1:
		qm.dispose();
}
}