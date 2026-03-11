/*
	名字:	[十字獵人] 轉達特殊任務
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
		if (status == 3) {
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
		qm.sendNextS("(You come across a letter, but you're not sure where it came from.) Hm, this symbol... This letter must be from the Silent Crusade. Might as well open it.", 16);
		break;
	case 1:
		qm.sendNextPrev("If you're reading this, I need you to return to our hideout as soon as you can. I'll fill you in when you get here. \r\n\r\n - Starling -");
		break;
	case 2:
		qm.sendNextPrev("P.S. - I've attached transportation to the hideout. Don't lose it, or ou'll have to return the long way.");
		break;
	case 3:
		qm.sendYesNoS("Sounds urgent. Better go check it out.", 2);
		break;
	case 4:
		if (qm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.USE).getNumFreeSlot() < 1) {
			qm.getClient().getSession().write(Packages.tools.packet.CWvsContext.serverNotice(1, "Use item inventory is full."));
			qm.dispose();
			return;
			}
			qm.gainItem(2030026, qm.getPlayer().itemQuantity(2030026) ? 0 : 1);
			Packages.server.quest.MapleQuest.getInstance(1653).forceStart(qm.getPlayer(), qm.getNpc(), null);
			qm.sendNextS("This must be the ticket Starling mentioned. It should be a one-way instant trip to the Silent Crusade hideout.", 17);
			break;
	case 5:
		qm.getMap().broadcastMessage(Packages.tools.packet.CField.environmentChange("crossHunter/chapter/start3", 3));
		qm.dispose();
}
}