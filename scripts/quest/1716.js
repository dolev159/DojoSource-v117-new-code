/*
	名字:	製作閃亮亮鬍子
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
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(1716)).getStatus() < 1) {
			Packages.server.quest.MapleQuest.getInstance(1716).forceStart(qm.getPlayer(), qm.getNpc(), null);
			qm.dispose();
			return;
			}
			qm.sendSimple("Oh! I felt a shining light the moment you approached me! Now, where are the jewels? \r\n\r\n#L0##bHere are 20 Channeling Jewel.#l");
			break;
	case 1:
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
			qm.gainExp(34161);
			qm.gainItem(2550003, 1);
			qm.gainItem(4001690, 1);
			qm.gainItem(4033203, -20);
			Packages.server.quest.MapleQuest.getInstance(1716).forceComplete(qm.getPlayer(), qm.getNpc());
			qm.getMap().broadcastMessage(Packages.tools.packet.CField.environmentChange("monsterPark/clearF", 3));
			qm.updateInfoQuest(1703, qm.getInfoQuest(1703).substr(0, 2) + '1' + qm.getInfoQuest(1703).substr(2 + 1));
			qm.sendNext("This soft and glossy stacherino... the definition of SUAVE! People won't know what hit them once they see this face. Leave me now!");
			break;
	case 2:
		qm.dispose();
}
}