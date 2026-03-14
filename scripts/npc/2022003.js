/*
	名字:	邪摩斯
	地圖:	邪摩斯的單人房
	描述:	211000002
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
		if (type == 2) {
		cm.sendNext("Just let me know if you decide to trade. There's plenty of time.");
		cm.dispose();
		return;
		}
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
		cm.sendSimple("#e<Party Quest: Resurrection of the Hoblin King>#n \r\nWelcome, #h0#. What brings you here? \r\n#L0##bI want to go stop the resurrection of Rex the Hoblin King.#l\r\n#L1#I need an empty bottle to hold Ancient Glacial Water.#l\r\n#L2#I would like an explanation.#l\r\n#L3#I want to receive an item.#l");
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
			cm.sendNext("I need to talk to your party leader.");
			cm.dispose();
			return;
			}
			party = cm.getPlayer().getParty().getMembers();
		if (party.size() < 2) {
			cm.sendNext("You cannot enter because your party doesn't have 2 members. You need 2 party members at Lv. 70 or higher to enter, so double-check and talk to me again.");
			cm.dispose();
			return;
			}
			for (var i = 0; i < party.size(); i++)
		if (party.get(i).getMapid() != 211000002) {
			cm.sendOk("Some of your party members are not here. All of your party members must be here in order to start.");
			cm.dispose();
			return;
			}
			for (var i = 0; i < party.size(); i++)
		if (party.get(i).getLevel() < 70) {
			cm.sendOk("There's a party member who's below Lv. 70. We aren't going to daycare here! Go train some more!");
			cm.dispose();
			return;
			}
			cm.sendNextS("Okay, I'll explain the mission to you again. We are going to prevent the resurrection of Rex, the Hoblin King. On the way there, we'll be attacked by Rex's minions. So, your #bmission is to protect me and make sure that I reach Rex's location safely#k.", 1);
			break;
	case 2:
		cm.sendNextPrevS("Normally, l don't trust humans, but I'm making an exception you all. Now, let's go through the secret path to get to the Ice Ravine.", 1);
		break;
	case 3:
		if (!cm.getPQEngine().startInstance(cm.getPlayer().getParty(), "Hoblin King", cm)) {
            cm.sendNext("Your party does not meet the requirements or another party is already attempting this quest. Please try again later.");
		}
		cm.dispose();
		return;
}
}

function action1(mode, type, selection) {
	switch (status) {
	case 1:
		if (cm.getPlayer().itemQuantity(4032649)) {
			cm.sendOk("You already have the Empty Bottle for Ancient Glacial Water.");
			cm.dispose();
			return;
			}
			cm.gainItem(4032649, 1);
			cm.sendNext("Ah, yes, preparing the Ancient Glacial Water for me is a great idea. If I fall into danger while you are escorting me, just make me drink that. If I die, all your effort will be wasted.");
			break;
	case 2:
		cm.dispose();
}
}

function action2(mode, type, selection) {
	switch (status) {
	case 1:
		cm.sendOk("#e<Party Quest: Moon Bunny's Rice Cake>#n \r\nThere isn't much time before the resurrection of #r#o9300281##k, the Hoblin King! The Seal Stone that held #r#o9300281##k is losing its power. Our only hope is to go to, where #r#o9300281##k is sealed and stop his resurrection directly. I can guide you there, but you'll have to protect me. \r\n#e- Level#n: 70 or above #r(Recommended Level: 70 - 99 )#k  \r\n#e- Time Limit#n: 20 min. \r\n#e- Players#k: 2 to 6 \r\n#e- Rewards#n: \r\n#v1032077# #t1032077#\r\n#v1032078# #t1032078#\r\n#v1032079# #t1032079#\r\n#v1902048# #t1902048#");
		break;
	case 2:
		cm.dispose();
}
}

function action3(mode, type, selection) {
	switch (status) {
	case 1:
		cm.sendSimple("Which item do you want? \r\n#L4##b#v1032102# #t1032102##l\r\n#L5##v1032103# #t1032103##l\r\n#L6##v1032104# #t1032104##l\r\n#L7##v1902048# #t1902048##l");
		break;
	default:
		if (status == 2 && type == 5) option = selection;
		reactor = 'action' + (option < 7 ? 4 : 5);
		eval(reactor)(mode, type, selection);
}
}

function action4(mode, type, selection) {
	switch (status) {
	case 2:
		if (cm.getPlayer().itemQuantity(4001530) < 50 || cm.getPlayer().itemQuantity(1032073 + option) < 1) {
			cm.sendNext("In order to get #b#t" + (1032098 + option) + "##k, you need 50 #bHobb Warrior Marks#k and 1 #b#t" + (1032073 + option) + "#s#k. Now hurry up and go get them.");
			cm.dispose();
			return;
			}
			cm.sendYesNo("You need #b50 Hoblin Warrior Mark#k and 1 #b#t" + (1032073 + option) + "#s#k items to receive the #b#t" + (1032098 + option) + "#s#k. Wanna trade?");
			break;
	case 3:
		if (cm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.EQUIP).getNumFreeSlot() < 1) {
			cm.sendOk("Please check to see if you have an available slot in the Equip tab.");
			cm.dispose();
			return;
			}
			cm.gainItem(4001530, -50);
			cm.gainItem(1032073 + option, -1);
			cm.gainItem(1032098 + option, 1);
			cm.sendNext("Here is a #b#t" + (1032098 + option) + "#s#k. This is quite valuable to all true Hoblin warriors.");
			cm.dispose();
}
}

function action5(mode, type, selection) {
	switch (status) {
	case 2:
		if (cm.getPlayer().itemQuantity(4001530) < 300) {
			cm.sendNext("In order to get Rex's Hyena, you need 300 #bHobb Warrior Marks#k. Now hurry up and go get them.");
			cm.dispose();
			return;
			}
			cm.sendYesNo("You need #b300 Hoblin Warrior Mark#k items to receive the #bRex's Hyena#k. Wanna trade?");
			break;
	case 3:
		if (cm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.EQUIP).getNumFreeSlot() < 1) {
			cm.sendOk("Please check to see if you have an available slot in the Equip tab.");
			cm.dispose();
			return;
			}
			cm.gainItem(4001530, -300);
			cm.gainItem(1902048, 1);
			cm.sendNext("Here is a #bRex's Hyena#k. This is quite valuable to all true Hoblin warriors.");
			cm.dispose();
}
}