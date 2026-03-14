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
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(1726)).getStatus() < 1) {
			Packages.server.quest.MapleQuest.getInstance(1726).forceStart(qm.getPlayer(), qm.getNpc(), null);
			qm.dispose();
			return;
			}
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(1726)).getStatus() < 2) {
		if (qm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.ETC).getNumFreeSlot() < 1) {
			qm.getClient().getSession().write(Packages.tools.packet.CWvsContext.serverNotice(1, "Etc item inventory is full."));
			qm.dispose();
			return;
			}
		if (qm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.USE).getNumFreeSlot() < 1) {
			qm.getClient().getSession().write(Packages.tools.packet.CWvsContext.serverNotice(1, "Use item inventory is full."));
			qm.dispose();
			return;
			}
			Packages.server.quest.MapleQuest.getInstance(1726).forceComplete(qm.getPlayer(), qm.getNpc());
			qm.getMap().broadcastMessage(Packages.tools.packet.CField.environmentChange("monsterPark/clearF", 3));
			qm.updateInfoQuest(1703, qm.getInfoQuest(1703).substr(0, 3) + '1' + qm.getInfoQuest(1703).substr(3 + 1));
			qm.gainItem(4033214, -1);
			qm.gainItem(4001690, 1);
			qm.gainItem(2550003, 1);
			qm.gainExp(39528);
			}
			qm.sendNext("Ah, you brought the sap! What a stunning scent! Hmm? It was a Palm Tree, not a Cactus? Nice improvisation! I can appreciate someone with a nose for good quality.");
			break;
	case 1:
		qm.sendPrev("Now is the time for me to face my destiny. Now is the time for me to form my heart into a love-coated pudding of hopeful excitement! I'm going to go see my queen! Come to the King's Room if you wish to bask in her glory once more!");
		break;
	case 2:
		qm.dispose();
}
}