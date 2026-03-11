/*
	名字:	最棒司令官的榮譽
	地圖:	耶雷弗
	描述:	130000000
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
		qm.sendAcceptDecline("Knight of light, protector of virtue, your presence has been an inspiration for our people. I only hope I do not place too much weight on your shoulders, for I have another favor I must ask. P-please. Take on the training of the Noblesse who wish to follow you as Dawn Warriors. You're the only one who can!");
		break;
	case 1:
		if (qm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.EQUIP).getNumFreeSlot() < 1) {
			qm.sendNext("Oh, please empty at least one slot in your Equip tab.");
			qm.dispose();
			return;
			}
			qm.gainItem(1142403, 1);
			//qm.getPlayer().changeSingleSkillLevel(Packages.client.SkillFactory.getSkill(50001005), 1, 1, -1);
			qm.getPlayer().changeSingleSkillLevel(Packages.client.SkillFactory.getSkill(50001215), 1, 1, -1);
			Packages.server.quest.MapleQuest.getInstance(20420).forceComplete(qm.getPlayer(), qm.getNpc());
			qm.sendOk("I have given you a beitting medal. I trust we'll see great things from you.");
			break;
	case 2:
		qm.dispose();
}
}