/*
	名字:	神之冒險家
	地圖:	維多利亞港
	描述:	104000000
*/

var status = -1;

function start(mode, type, selection) {
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
		Packages.server.quest.MapleQuest.getInstance(29903).forceStart(qm.getPlayer(), qm.getNpc(), null);
		qm.getClient().getSession().write(Packages.tools.packet.CWvsContext.getShowQuestCompletion(29903));
		qm.getClient().getSession().write(Packages.tools.packet.CWvsContext.serverNotice(5, "You have earned the <Master Adventurer> title. You can receive a Medal from NPC Dalair."));
		qm.dispose();
}
}

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
		qm.sendNext("Congratulations on earning your honorable #b<Master Adventurer>#k title. I wish you the best of luck in your future endeavors! Keep up the good work. \r\n\r\n#fUI/UIWindow.img/QuestIcon/4/0# \r\n#v1142110# #t1142110# 1");
		break;
	case 1:
		if (qm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.EQUIP).getNumFreeSlot() < 1) {
			qm.sendOk("Make sure you have enough space in the Equip window of your Item Inventory.");
			qm.dispose();
			return;
			}
			Packages.server.quest.MapleQuest.getInstance(29903).forceComplete(qm.getPlayer(), qm.getNpc());
			qm.gainItem(1142110, 1);
			qm.dispose();
}
}