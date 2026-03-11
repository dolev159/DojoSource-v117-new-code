/*
	名字:	見習騎士之路…
	地圖:	見習騎士之路…
	描述:	見習騎士之路…
*/

var status = -1;

function start(mode, type, selection) {
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
		qm.sendYesNo("Congratulations on passing your trials, Mihile. Are you prepared to be declared an official apprentice knight?");
		break;
	case 1:
		if (qm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.EQUIP).getNumFreeSlot() < 1) {
			qm.sendNext("Make sure you have at least 2 Equip lnventory slots available.");
			qm.dispose();
			return;
			}
			Packages.server.quest.MapleQuest.getInstance(20810).forceComplete(qm.getPlayer(), qm.getNpc());
			qm.getPlayer().changeJob(5110);
			qm.gainEquip(1098001, -10);
			qm.getPlayer().gainSP(1, 1);
			qm.gainItem(1142400, 1);
			qm.sendOk("I now pronounce you an Apprentice Knight! I've given you some SP to use. Make us proud.");
			break;
	case 2:
		qm.dispose();
}
}