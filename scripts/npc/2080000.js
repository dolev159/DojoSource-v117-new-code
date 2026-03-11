/*
	名字:	摩斯
	地圖:	神木村
	描述:	240000000
*/

var status;

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	switch (mode) {
	case -1:
		cm.dispose();
		return;
	case 0:
		if (status < 1) {
		cm.dispose();
		return;
		}
		if (select < 1) {
		cm.dispose();
		return;
		}
		if (select < 2) {
		cm.sendNext("It doesn't take much to ruin good equipment. You need to be diligent about repairing as frequently as possible.");
		cm.dispose();
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
		cm.sendSimple("Hmm... Looks like you need a favor. Tell me, what brings you here? \r\n#L0##bI need Cornian's Dagger.#l\r\n#L1#I would like to get a repair done.#l");
		break;
	default:
		if (status == 1 && type == 5) select = selection;
		reactor = 'action' + select;
		eval(reactor)(mode, type, selection);
}
}

function action0(mode, type, selection) {
	switch (status) {
	case 1:
		cm.sendYesNo("You need #b#t4001078##k? #b#t4001078##k... Bring me a #bBusted Dagger#k. Here's a list of everything I need to repair the #bBusted Dagger#k. Well? \r\n#b#v4001079# #t4001079# x 1\r\n#v4011001# #t4011001# x 1\r\n#v4011002# #t4011002# x 1");
		break;
	case 2:
		if (cm.getPlayer().itemQuantity(4001079) < 1 || cm.getPlayer().itemQuantity(4011001) < 1 || cm.getPlayer().itemQuantity(4011002) < 1) {
			cm.sendOk("You do not have the required items.");
			cm.dispose();
			return;
			}
		if (cm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.ETC).getNumFreeSlot() < 1) {
			cm.getClient().getSession().write(Packages.tools.packet.CWvsContext.serverNotice(1, "Etc item inventory is full."));
			cm.dispose();
			return;
			}
			cm.gainItem(4001079, -1);
			cm.gainItem(4011001, -1);
			cm.gainItem(4011002, -1);
			cm.gainItem(4001078, 1);
			cm.sendOk("How is it? Good as new, yes? If you need me to make a new one, just ask.");
			break;
	case 3:
		cm.dispose();
}
}

function action1(mode, type, selection) {
	switch (status) {
	case 1:
		cm.sendYesNo("All right. It's been a while, but my skills are still razor sharp. You know that repair fees vary depending on Durability and Equipment Rank, right? Do you want to repair your equipment now?");
		break;
	case 2:
		cm.sendRepairWindow();
		cm.dispose();
}
}