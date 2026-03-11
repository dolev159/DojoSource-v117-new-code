/*
	名字:	[十字獵人] 發生危急的情況
	地圖:	補給品倉庫
	描述:	931050500
*/

var status = -1;

function start(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		if (status > 1) {
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
		qm.sendNextS("(The symbol on the letter you've obtained looks familiar.) A new mission, perhaps?", 16);
		break;
	case 1:
		qm.sendNextPrev("From #b#p9073023##k at the #r#m230040410##k.");
		break;
	case 2:
		qm.sendYesNoS("Something super urgent has come up. What to do, what to do?", 2);
		break;
	case 3:
		if (qm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.USE).getNumFreeSlot() < 1) {
			qm.getClient().getSession().write(Packages.tools.packet.CWvsContext.serverNotice(1, "Use item inventory is full."));
			qm.dispose();
			return;
			}
			qm.gainItem(2030027, qm.getPlayer().itemQuantity(2030027) ? 0 : 1);
			Packages.server.quest.MapleQuest.getInstance(1664).forceStart(qm.getPlayer(), qm.getNpc(), null);
			qm.sendNextS("The ticket's in here. Use it to visit #p9073023#.", 17);
			break;
	case 4:
		qm.getMap().broadcastMessage(Packages.tools.packet.CField.environmentChange("crossHunter/chapter/start4", 3));
		qm.dispose();
}
}