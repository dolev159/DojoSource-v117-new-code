/*
	名字:	[十字獵人]研究所的爆發裝置
	地圖:	研究所C-3區
	描述:	261020500
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
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(1628)).getStatus() < 1) {
			Packages.server.quest.MapleQuest.getInstance(1628).forceStart(qm.getPlayer(), qm.getNpc(), null);
			qm.dispose();
			return;
			}
			qm.sendNext("That was close. Stop looking at me like that.");
			break;
	case 1:
		qm.sendNextPrev("Sorry. Didn't mean to... Why does this type of stuff always seem to happen to me?");
		break;
	case 2:
		if (qm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.USE).getNumFreeSlot() < 2) {
			qm.getClient().getSession().write(Packages.tools.packet.CWvsContext.serverNotice(1, "Use item inventory is full."));
			qm.dispose();
			return;
			}
			Packages.server.quest.MapleQuest.getInstance(1628).forceComplete(qm.getPlayer(), qm.getNpc());
			qm.getMap().broadcastMessage(Packages.tools.packet.CField.environmentChange("crossHunter/chapter/end1", 3));
                    		qm.gainItem(1112677, 1);
			qm.gainItem(2000025, 50);
			qm.gainItem(2000028, 50);
                    		qm.gainExp(77790);
			qm.dispose();
}
}