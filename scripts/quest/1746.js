/*
	名字:	脫離
	地圖:	休菲凱曼作業場
	描述:	956040600
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
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(1746)).getStatus() < 1) {
			Packages.server.quest.MapleQuest.getInstance(1746).forceStart(qm.getPlayer(), qm.getNpc(), null);
			qm.dispose();
			return;
			}
			qm.sendNextS("Why are you here? Who said you could come in here? This is a SPIEGELMANN ONLY zone! Get out!", 1);
			break;
	case 1:
		qm.sendNextPrevS("I'll give this to you if you go away!", 1);
		break;
	case 2:
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
			qm.dispose();
			qm.gainExp(42403);
			qm.gainItem(4001690, 1);
			qm.gainItem(2550003, 1);
			qm.getMap().broadcastMessage(Packages.tools.packet.CField.environmentChange("monsterPark/clearF", 3));
			Packages.server.quest.MapleQuest.getInstance(1746).forceComplete(qm.getPlayer(), qm.getNpc());
			qm.updateInfoQuest(1703, qm.getInfoQuest(1703).substr(0, 5) + '1' + qm.getInfoQuest(1703).substr(5 + 1));
}
}