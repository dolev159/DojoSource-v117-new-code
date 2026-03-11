/*
	名字:	阿杜比斯
	地圖:	通往殘暴炎魔之門
	描述:	211042300
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
	switch (status) {
	case 0:
		cm.sendSimple("Uh-huh... Uh-huh... Okay, it looks like you meet the requirements. What would you like to do? \r\n\r\n#L0##bInvestigate Dead Mine Caves.#l\r\n#L1#Explore Zakum Dungeon.#l\r\n#L2#Receive an offering for Zakum.#l\r\n#L3#Go to EI Nath.#l");
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
		if (cm.getPlayer().getParty() == null) {
			cm.sendNext("You are not in a party. You must form a party to challenge.");
			cm.dispose();
			return;
			}
		if (cm.getPlayer().getParty().getLeader().getId() != cm.getPlayer().getId()) {
			cm.sendNext("Have the party leader talk to me.");
			cm.dispose();
			return;
			}
			party = cm.getPlayer().getParty().getMembers();
			for (var i = 0; i < party.size(); i++)
		if (party.get(i).getMapid() != 211042300) {
			cm.sendNext("Some of your party members are in a different map. Make sure they're all here!");
			cm.dispose();
			return;
			}
			var em = cm.getEventManager("ZakumPQ");
			var prop = em.getProperty("state");
		if (prop == null || prop == 0) {
			em.startInstance(cm.getPlayer().getParty(), cm.getPlayer().getMap(), 200);
			cm.dispose();
			return;
			}
			cm.sendNext("Another party is already challenging it. Please try again later.");
			cm.dispose();
}
}

function action1(mode, type, selection) {
	switch (status) {
	case 1:
		cm.sendNext("Good! Now, you will be moved to the map that is filled with various traps. Good luck!");
		break;
	case 2:
		cm.getPlayer().changeMap(cm.getMap(280020000), cm.getMap(280020000).getPortal(0));
		cm.dispose();
}
}

function action2(mode, type, selection) {
	switch (status) {
	case 1:
		cm.sendNext("You need an offering for Zakum...");
		break;
	case 2:
		cm.sendNextPrev("Since I have lots of #b#t4001017##k. I'll just give you some. Not good for anything besides offerings anyway.");
		break;
	case 3:
		if (cm.getPlayer().itemQuantity(4001017)) {
			cm.sendOk("You already have #t4001017# for the offering to Zakum... Talk to me again when you use it up.");
			cm.dispose();
			return;
			}
		if (cm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.ETC).getNumFreeSlot() < 1) {
			cm.sendNext("Hmm... It seems like your bag is full. Check if you have an empty slot in your ETC window.");
			cm.dispose();
			return;
			}
			cm.gainItem(4001017, 1);
			cm.sendOk("Just drop this on Zakum's Altar.");
			break;
	case 4:
		cm.dispose();
}
}

function action3(mode, type, selection) {
	switch (status) {
	case 1:
		cm.sendNext("Very well, I will send you to El Nath.");
		break;
	case 2:
		cm.sendNextPrev("lf you want to come back, talk to the chiefs in El Nath.");
		break;
	case 3:
		cm.getPlayer().changeMap(cm.getMap(211000000), cm.getMap(211000000).getPortal(0));
		cm.dispose();
}
}