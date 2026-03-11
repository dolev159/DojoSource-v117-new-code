/*
	名字:	貝爾
	地圖:	地鐵售票處
	描述:	103020000
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
		if (status < 2) {
		cm.dispose();
		return;
		}
		status--;
		break;
	case 1:
		status++;
		break;
		}
		reactor = 'action' + (cm.getPlayer().getMap().getId() == 103020000 ? 0 : cm.getPlayer().getMap().getId() == 600010001 ? 1 : 2);
		eval(reactor)(mode, type, selection);
}

function action0(mode, type, selection) {
	switch (status) {
	case 0:
		cm.sendSimple("Hello. Would you like to buy a ticket for the subway? \r\n#L0##bNew Leaf City of Masteria#l");
		break;
	case 1:
		cm.sendYesNo("The ride to New Leaf City of Masteria takes off every 10 minutes, beginning on the hour, and it'll cost you #b5000 mesos#k. Are you sure you want to purchase #b#t4031711##k?");
		break;
	case 2:
		if (cm.getPlayer().getMeso() < 5000 || cm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.ETC).getNumFreeSlot() < 1) {
			cm.sendNext("Are you sure you have #b5000 mesos#k? Please check the Etc window of your Item Inventory.");
			cm.dispose();
			return;
			}
			cm.gainMeso(-5000);
			cm.gainItem(4031711, 1);
			cm.dispose();
}
}

function action1(mode, type, selection) {
	switch (status) {
	case 0:
		cm.sendSimple("Hello. Would you like to buy a ticket for the subway? \r\n#L0##bKerning City of Victoria Island#l");
		break;
	case 1:
		cm.sendYesNo("The ride to Kerning City of Victoria Island takes off every 10 minutes, beginning on the hour, and it'll cost you #b5000 mesos#k. Are you sure you want to purchase #b#t4031713##k?");
		break;
	case 2:
		if (cm.getPlayer().getMeso() < 5000 || cm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.ETC).getNumFreeSlot() < 1) {
			cm.sendNext("Are you sure you have #b5000 mesos#k? Please check the Etc window of your Item Inventory.");
			cm.dispose();
			return;
			}
			cm.gainMeso(-5000);
			cm.gainItem(4031713, 1);
			cm.dispose();
}
}

function action2(mode, type, selection) {
	switch (status) {
	case 0:
		cm.sendYesNo("Do you want to leave before the train start? There will be no refund.");
		break;
	case 1:
		cm.getPlayer().changeMap(cm.getMap(cm.getPlayer().getMap().getId() == 600010004 ? 103020000 : 600010001), cm.getMap(cm.getPlayer().getMap().getId() == 600010004 ? 103020000 : 600010001).getPortal(0));
		cm.dispose();
}
}