/*
	名字:	小海豚
	地圖:	危險之海岔道&amp;lt;準備室&gt;
	描述:	923040000
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
		if (type == 5) {
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
		cm.sendSimple("#e<Party Quest: Kenta In Danger>#n \r\nOh, poor Kenta! You must help him. He heard that some of the sea creatures were acting strange, and went to check it out. He hasn't come back yet, and I'm getting worried. We must find Kenta. Could you help us? \r\n#L0##bI will go find Kenta.#l\r\n#L1#I would like to have Kenta's Goggles.#l\r\n#L4#Are there any other details?#l");
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
		if (cm.getPlayer().getParty() == null || cm.getPlayer().getParty().getLeader().getId() != cm.getPlayer().getId()) {
			cm.sendOk("Creatures on the Aqua Road have become enraged. It's not safe to go in by yourself. Have your party leader speak to me if you want to enter as a group.");
			cm.dispose();
			return;
			}
			party = cm.getPlayer().getParty().getMembers();
		if (party.size() < 2) {
			cm.sendNext("You cannot enter because your party doesn't have 2 members. You need 2 party members at Lv. 120 or higher to enter, so double-check and talk to me again.");
			cm.dispose();
			return;
			}
			for (var i = 0; i < party.size(); i++)
		if (party.get(i).getMapid() != 923040000) {
			cm.sendOk("One of your party members is in a different map. All party members must go together.");
			cm.dispose();
			return;
			}
			var em = cm.getEventManager("Kenta");
			var prop = em.getProperty("state");
		if (prop == null || prop == 0) {
			em.startInstance(cm.getPlayer().getParty(), cm.getPlayer().getMap(), 200);
			cm.dispose();
			return;
			}
			cm.sendNext("Some other party has already gotten in to try clearing the quest. Please try again later.");
			cm.dispose();
}
}

function action1(mode, type, selection) {
	switch (status) {
	case 1:
		cm.sendNext("Oh, so you want #v1022123# #t1022123#, do you? #t1022123# is a gift for people who have helped with sea life research. If you bring about #b100 #t4001535#s#k for research, I will give you the gift. You can obtain a Pianus Scale from eliminating Pianus. If 100 Pianus Scales are too much for you, then just bring #b10 #t4001535#s#k to get a Pet Equipment Scroll. Good luck!");
		break;
	case 2:
		cm.sendSimple("Would you like to use Pianus Scales for Kenta's research? \r\n#L2##b10 Pianus Scales - Pet related scrolls.#l\r\n#L3#100 Pianus Scales - #v1022123# Kenta's Goggles.#l");
		break;
	default:
		reactor = 'action' + selection;
		eval(reactor)(mode, type, selection);
}
}

function action2(mode, type, selection) {
	switch (status) {
	case 3:
		if (cm.getPlayer().itemQuantity(4001535) < 10 || cm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.USE).getNumFreeSlot() < 1) {
			cm.sendOk("Check to see if you really have Pianus Scales, or if there is at least one space free in your Inventory Consumable tab.");
			cm.dispose();
			return;
			}
			cm.gainItem(4001535, -10);
			cm.gainItem(2048010 + java.lang.Math.floor(java.lang.Math.random() * 4) | 0, 1);
			cm.sendNext("These scrolls will go great with your Pet.");
			cm.dispose();
}
}

function action3(mode, type, selection) {
	switch (status) {
	case 3:
		if (cm.getPlayer().itemQuantity(4001535) < 100 || cm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.EQUIP).getNumFreeSlot() < 1) {
			cm.sendOk("Check to see if you really have Pianus Scales or if there is at least one space free in your Inventory Equipment tab.");
			cm.dispose();
			return;
			}
			cm.gainItem(4001535, -100);
			cm.gainItem(1022123, 1);
			cm.sendNext("These Goggles will look great on you.");
			cm.dispose();
}
}

function action4(mode, type, selection) {
	switch (status) {
	case 1:
		cm.sendNext("Kenta was researching sea creatures through samples he got from Explorers, but that was only effective for a while. When his research needed to go further, he decided to go into the Dangerous Sea Areas to conduct direct research. I haven't heard from him since he left... He must be in trouble.");
		break;
	case 2:
		cm.sendNextPrev("Please find Kenta, and be careful! The area is very dangerous. Here's what you can expect: \r\n\r\n1. Eliminate any enraged sea creatures on your way to find Kenta. \r\n2. Kenta has been gone for a long time, so he might not have enough air. Obtain some Air Bubbles for him. \r\n3. When you find Kenta, protect him from the enraged sea creatures. \r\n4. Lastly, if Kenta insists on finishing his research, help him do it and return safely.");
		break;
	case 3:
		cm.dispose();
}
}