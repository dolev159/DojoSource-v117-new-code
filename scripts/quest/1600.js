/*
	名字:	[十字獵人]S.O.S.要求
	地圖:	地鐵售票處
	描述:	103020000
*/

var status = -1;

function start(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		if (status < 1) {
		qm.sendOk("What's wrong?");
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
		qm.sendYesNo("Somebody! Anybody! Help!");
		break;
	case 1:
		qm.sendNext("A lady followed a bunch of creeps into the Subway. They looked really dangerous. Can you head into the #bSubway Construction Site#k and make sure she's okay?");
		break;
	case 2:
		qm.sendNextPrev("I'll send you to the Subway Ticketing Booth. Hurry!");
		break;
	case 3:
		if (qm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.USE).getNumFreeSlot() < 1) {
			qm.sendOk("You don't have enough space in your Use tab. Talk to me after you make some space.");
			qm.dispose();
			return;
			}
			qm.gainItem(2030028, qm.getPlayer().itemQuantity(2030028) ? 0 : 1);
			Packages.server.quest.MapleQuest.getInstance(1600).forceStart(qm.getPlayer(), qm.getNpc(), null);
			qm.getMap().broadcastMessage(Packages.tools.packet.CField.environmentChange("crossHunter/chapter/start1", 3));
			qm.dispose();
}
}