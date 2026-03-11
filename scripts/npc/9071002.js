/*
	名字:	梅里
	地圖:	怪物公園
	描述:	951000000
*/

var Ticket = [4001513, 4001515, 4001521];

var meso = [50000, 100000, 200000];

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
	switch (status) {
	case 0:
		cm.sendSimple("Hello! If you want to enjoy the Monster Park, then you came to the right person! So, what can l do for you? \r\n#L0##bExchange #t4001514# Piece#l\r\n#L1#Exchange #t4001516# Piece#l\r\n#L2#Exchange #t4001522# Piece#l\r\n#L3#Purchase an Entrance Ticket#l");
		break;
	default:
		if (status == 1 && type == 5) select = selection;
		reactor = 'action' + (select < 3 ? 0 : 1);
		eval(reactor)(mode, type, selection);
}
}

function action0(mode, type, selection) {
	switch (status) {
	case 1:
		if (cm.getPlayer().itemQuantity(Ticket[select]) < 10) {
			cm.sendNext("Hey, you don't have enough Ticket Pieces. Remember, you need to have #b10 Ticket Pieces#k to exchange for a Ticket.");
			cm.dispose();
			return;
			}
			cm.sendYesNo("Are you sure? Do you really want to exchange 10 #b#t" + Ticket[select] + "#s#k for 1 #b#t" + (Ticket[select] + 1) + "##k?");
			break;
	case 2:
		if (cm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.ETC).getNumFreeSlot() < 1) {
			cm.sendOk("You don't have any Inventory space.");
			cm.dispose();
			return;
			}
			cm.gainItem(Ticket[select], -10);
			cm.gainItem(Ticket[select] + 1, 1);
			cm.sendOk("You're all se Have a great time at the Monster Park.");
			cm.dispose();
}
}

function action1(mode, type, selection) {
	switch (status) {
	case 1:
		cm.sendSimple("Hm... I'm not supposed to do this, but since I'm having such a great day. I will give you a special discount, just for you! #rBut I'll sell you 3 Tickets per day, no matter the types of the Tickets. And, er, keep this a secret from Spiegelmann! \r\n#L0##b#t4001514# 50,000 meso#l\r\n#L1##t4001516# 100,000 meso#l\r\n#L2##t4001522# 200,000 meso#l");
		break;
	case 2:
		if (cm.getPlayer().getMeso() < meso[selection] || cm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.ETC).getNumFreeSlot() < 1) {
			cm.sendNext("You either don't have enough money, or don't have any Inventory space.");
			cm.dispose();
			return;
			}
			cm.gainMeso(-meso[selection]);
			cm.gainItem(Ticket[selection] + 1, 1);
			cm.sendOk("Okay, have a great time at the Monster Park!");
			cm.dispose();
}
}