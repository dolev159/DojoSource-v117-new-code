/*
	名字:	照顧幼虎2
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
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(1735)).getStatus() < 1) {
			Packages.server.quest.MapleQuest.getInstance(1735).forceStart(qm.getPlayer(), qm.getNpc(), null);
			qm.dispose();
			return;
			}
			qm.sendSimple("Our baby needs clean and warm air. \r\n\r\n#L0##bAre you feeling okay? You're getting kind of... crezy.#l");
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
			qm.gainExp(37577);
			qm.gainItem(4033207, -5);
			qm.gainItem(4033208, -15);
			qm.gainItem(4001690, 1);
			qm.gainItem(2550003, 1);
			qm.getMap().broadcastMessage(Packages.tools.packet.CField.environmentChange("monsterPark/clearF", 3));
			Packages.server.quest.MapleQuest.getInstance(1735).forceComplete(qm.getPlayer(), qm.getNpc());
			qm.updateInfoQuest(1703, qm.getInfoQuest(1703).substr(0, 4) + '1' + qm.getInfoQuest(1703).substr(4 + 1));
			qm.sendNext("Ooh, very nice. Our baby will love this! Here, you deserve a little something too!");
			break;
	case 2:
		qm.dispose();
}
}