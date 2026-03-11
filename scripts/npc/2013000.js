/*
	名字:	溫莉
	地圖:	疑問之塔
	描述:	200080101
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
		cm.sendSimple("#e<Party Quest: Remnants of Goddless>#n \r\nHi, I'm Wonky the Fairy, Talk to me if you want to explore the Goddess Tower. Oh also, if you have a Warrior, Magician, Thief, Bowman, and Pirate in your party, I will grant you Wonky's Blessing. \r\n#L0##bRequest admission.#l\r\n#L1#Ask about Tower of Goddess.#l\r\n#L2#Exchange Feather of Goddess for a different item.#l\r\n#L8#Find party members.#l");
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
			cm.sendOk("You can't enter alone. lf you want to enter, the party leader must talk to me. Ask your party leader to do so.");
			cm.dispose();
			return;
			}
			party = cm.getPlayer().getParty().getMembers();
			for (var i = 0; i < party.size(); i++)
		if (party.size() < 3 || party.get(i).getLevel() < 70) {
			cm.sendNext("You cannot enter because your party doesn't have 3 members. You need 3 party members at Lv.70 or higher to enter, so double-check and talk to me again.");
			cm.dispose();
			return;
			}
			for (var i = 0; i < party.size(); i++)
		if (party.get(i).getMapid() != 200080101) {
			cm.sendOk("One of your party members is in a different map. All party members must start together.");
			cm.dispose();
			return;
			}
			var em = cm.getEventManager("OrbisPQ");
			var prop = em.getProperty("state");
		if (prop == null || prop == 0) {
			em.startInstance(cm.getPlayer().getParty(), cm.getPlayer().getMap(), 200);
			cm.dispose();
			return;
			}
			cm.sendNext("Someone is already attempting the PQ. Please wait for them to finish, or find another channel.");
			cm.dispose();
}
}

function action1(mode, type, selection) {
	switch (status) {
	case 1:
		cm.sendNext("#e<Party Quest: Remnants of Goddless>#n \r\nAfter a heavy rainfall on EI Nath Mountains, a new cloud path opened behind the #bStatue of Goddess Minerva#k at the top of Orbis Tower. When a giant cloud far away split open, a mysterious tower appeared. It's the tower of #bGoddess Minerva#k, who ruled Orbis a long time ago. Would you like to begin your adventure at this legendary tower where Goddess Minerva is said to be trapped? \r\n#e- Level#n: 70 or higher #r(Recommended Level: 70- 119)#k  \r\n#e- Time Limit#n: 20 min \r\n#e- players#n: 3 to 6 \r\n#e- Reward#n: \r\n#v1082232:# #t1082232#\r\n#b(Can be traded for 15 Feathers of Goddess.)#k \r\n#v1072455:# #t1072455#\r\n#b(Can be traded for 10 Feathers of Goddess.)#k \r\n#v1082322:# #t1082322#\r\n#b(Can be traded for 30 Feathers of Goddess and 1 Goddess Wristband.)#k \r\n#v1072534:# #t1072534#\r\n#b(Can be traded for 20 Feathers of Goddess and 1 Goddess Shoes.)#k");
		break;
	case 2:
		cm.dispose();
}
}

function action2(mode, type, selection) {
	switch (status) {
	case 1:
		cm.sendNext("You want to trade Feathers of Goddess for a different item? Hmmm...my special gift is only for my close friends. If you want to be my friend, bring me something delicious. I'm so hungry right now!");
		break;
	case 2:
		cm.sendSimple("You are #b#h0##k! You gave me delicious food! Okay friend, I'll make a Goddess item out of your Feathers of Goddess. What would you like me to make? \r\n#L4##v1082232# #b#t1082232# #r(15 Feathers of Goddess required)#l\r\n#L5##v1072455# #b#t1072455# #r(10 Feathers of Goddess required)#l\r\n#L6##v1082322# #b#t1082322# #r(30 Feathers of Goddess and 1 Goddess Wristband required)#l\r\n#L7##v1072534# #b#t1072534# #r(30 Feathers of Goddess and 1 Goddess Shoes required)#l");
		break;
	default:
		if (status == 3 && type == 5) select = selection;
		reactor = 'action' + select;
		eval(reactor)(mode, type, selection);
}
}

function action4(mode, type, selection) {
	switch (status) {
	case 3:
		if (cm.getPlayer().itemQuantity(4001158) < 15) {
			cm.sendOk("Please make sure you have the amount of Feathers needed.");
			cm.dispose();
			return;
			}
		if (cm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.EQUIP).getNumFreeSlot() < 1) {
			cm.sendOk("It seems like you have no slots available in your Inventory. Could you check again?");
			cm.dispose();
			return;
			}
			cm.gainItem(4001158, -15);
			cm.gainItem(1082232, 1);
			cm.dispose();
}
}

function action5(mode, type, selection) {
	switch (status) {
	case 3:
		if (cm.getPlayer().itemQuantity(4001158) < 10) {
			cm.sendOk("Please make sure you have the amount of Feathers needed.");
			cm.dispose();
			return;
			}
		if (cm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.EQUIP).getNumFreeSlot() < 1) {
			cm.sendOk("It seems like you have no slots available in your Inventory. Could you check again?");
			cm.dispose();
			return;
			}
			cm.gainItem(4001158, -10);
			cm.gainItem(1072455, 1);
			cm.dispose();
}
}

function action6(mode, type, selection) {
	switch (status) {
	case 3:
		if (cm.getPlayer().itemQuantity(4001158) < 30 || cm.getPlayer().itemQuantity(1082232) < 1) {
			cm.sendOk("Please make sure you have the amount of Feathers needed. Or if you have the Goddess Wrisband.");
			cm.dispose();
			return;
			}
		if (cm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.EQUIP).getNumFreeSlot() < 1) {
			cm.sendOk("It seems like you have no slots available in your Inventory. Could you check again?");
			cm.dispose();
			return;
			}
			cm.gainItem(4001158, -30);
			cm.gainItem(1082232, -1);
			cm.gainItem(1082322, 1);
			cm.dispose();
}
}

function action7(mode, type, selection) {
	switch (status) {
	case 3:
		if (cm.getPlayer().itemQuantity(4001158) < 20 || cm.getPlayer().itemQuantity(1072455) < 1) {
			cm.sendOk("Please make sure you have the amount of Feathers needed. Or if you have the Goddess Shoes.");
			cm.dispose();
			return;
			}
		if (cm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.EQUIP).getNumFreeSlot() < 1) {
			cm.sendOk("It seems like you have no slots available in your Inventory. Could you check again?");
			cm.dispose();
			return;
			}
			cm.gainItem(4001158, -20);
			cm.gainItem(1072455, -1);
			cm.gainItem(1072534, 1);
			cm.dispose();
}
}

function action8(mode, type, selection) {
	switch (status) {
	case 1:
		cm.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.sendUIWindow(7, 1));
		cm.dispose();
}
}