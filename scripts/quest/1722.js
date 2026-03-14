/*
	名字:	為了她的禮物1
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
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(1722)).getStatus() < 1) {
			Packages.server.quest.MapleQuest.getInstance(1722).forceStart(qm.getPlayer(), qm.getNpc(), null);
			qm.dispose();
			return;
			}
			qm.gainExp(14374);
			qm.gainItem(4033211, -1);
			Packages.server.quest.MapleQuest.getInstance(1722).forceComplete(qm.getPlayer(), qm.getNpc());
			qm.sendOk("Oooh! You really made the Soft Silk! Alright then, let me touch it... Oh... OH YES! So silky smooth!");
			break;
	case 1:
		qm.dispose();
}
}