/*
	名字:	莎蘿
	地圖:	新加坡機場
	描述:	540010000
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
		cm.sendNext("I am here for a long time. Please talk to me again when you change your mind.");
		cm.dispose();
		return;
		}
		if (select < 2) {
		cm.sendOk("Please confirm the departure time you wish to leave. Thank you.");
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
		cm.sendSimple("Hello there~ I am Shalon from Singapore Airport. I will assist you in getting back to #m103000000# in no time. How can I help you?\r\n#L0##bI would like to buy a plane ticket to #m103000000##l\r\n#L1#Let me go in to the departure point.#l");
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
		cm.sendYesNo("The ticket will cost you 6,000 mesos. Will you purchase the ticket?");
		break;
	case 2:
		if (cm.getPlayer().getMeso() < 6000 || cm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.ETC).getNumFreeSlot() < 1) {
			cm.sendOk("I don't think you have enough meso or empty slot in your ETC inventory. Please check and talk to me again.");
			cm.dispose();
			return;
			}
			cm.gainMeso(-6000);
			cm.gainItem(4031732, 1);
			cm.dispose();
}
}

function action1(mode, type, selection) {
	switch (status) {
	case 1:
		cm.sendYesNo("Would you like to go in now? You will lose your ticket once you go in~ Thank you for choosing Wizet Airline.");
		break;
	case 2:
		if (cm.getPlayer().itemQuantity(4031732) < 1) {
			cm.sendNext("Please do purchase the ticket first. Thank you~");
			cm.dispose();
			return;
			}
			em = cm.getEventManager("AirPlane");

		if (em.getProperty("entry") == "false") {
			cm.sendNext("We are sorry but the gate is closed 1 minute before the departure.");
			cm.dispose();
			return;
			}
			cm.gainItem(4031732, -1);
			cm.getPlayer().changeMap(cm.getMap(540010001), cm.getMap(540010001).getPortal(0));
			cm.dispose();
}
}