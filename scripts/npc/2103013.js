/*
	名字:	杜亞特
	地圖:	金字塔山丘
	描述:	926010000
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
		cm.sendSimple("You there! My name is Duarte and l guard Nett's Pyramid. \r\n#L0##bHear about the pyramid.#l\r\n#L1##eEnter the pyramid.#n#l\r\n#L2#Search for a party.#l\r\n#L3#Exchange <Nett's Emeralds> for another item.#l");
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
		cm.sendNext("This is the pyramid of Nett, the god of chaos and revenge. Though this place has been buried deep in the sands for ages, it surfaced with the will of Nett. If thou are not afraid of unknown chaos and doom that comes with it, thou may challenge thyself to the trials of Nett. Fate always lies with the one who made the choice...");
		break;
	case 2:
		cm.sendNextPrev("As soon as thou enter the pyramid, the trials of Nett shall begin. Thou must make sure that the constant waves of monsters do not reach the #b#nObelisk#n#k. With the points acquired from the pyramid, thou may purchase #beye items#k.");
		break;
	case 3:
		cm.sendNextPrev("Glory shall go to those who conquer Nett's trials, and those who kneel before them shall perish. These are all the words I can offer thee. The rest lies on your own convictions.");
		break;
	case 3:
		cm.dispose();
}
}

function action1(mode, type, selection) {
	switch (status) {
	case 1:
		if (cm.getPlayer().getParty() == null || cm.getPlayer().getParty().getLeader().getId() != cm.getPlayer().getId()) {
			cm.sendOk("lf thou wishes to enter the pyramid, do so through thy party leader.");
			cm.dispose();
			return;
			}
			party = cm.getPlayer().getParty().getMembers();
			for (var i = 0; i < party.size(); i++)
		if (party.size() < 3 || party.get(i).getLevel() < 70) {
			cm.sendNext("Thou cannot take on the challenge, as thou dost not have 4 people in thy party. ");
			cm.dispose();
			return;
			}
			for (var i = 0; i < party.size(); i++)
		if (party.get(i).getMapid() != 926010000) {
			cm.sendNext("Some of your party members are in a different map. Please try again once everyone is together.");
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
			cm.sendNext("");
			cm.dispose();
}
}

function action2(mode, type, selection) {
	switch (status) {
	case 1:
		cm.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.sendUIWindow(7, 1));
		cm.dispose();
}
}

function action3(mode, type, selection) {
	switch (status) {
	case 1:
		cm.sendSimple("If thou conquers Nett's trials and collects #b#nNett's Emeralds#n#k, thou can exchange them for an item. Which item dost thou want? \r\n\r\n#L4##v1132013# #b#t1132013# #r(#t4001623# x 40 required)#l\r\n#L5##v1072619# #b#t1072619# #r(#t4001623# x 40 required)#l\r\n#L6##v1112682# #b#t1112682# #r(#t4001623# x 40 required, Available 15 days)#l");
		break;
	default:
		if (status == 2 && type == 5) select = selection;
		reactor = 'action' + select;
		eval(reactor)(mode, type, selection);
}
}

function action4(mode, type, selection) {
	switch (status) {
	case 2:
		if (cm.getPlayer().itemQuantity(4001623) < 40) {
			cm.sendOk("Thou dost not have enough Nett's Emeralds. lf thou wishes to receive #v1132013##b#t1132013##k, thou needs at least 40.");
			cm.dispose();
			return;
			}
		if (cm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.EQUIP).getNumFreeSlot() < 1) {
			cm.sendOk("");
			cm.dispose();
			return;
			}
			cm.gainItem(4001623, -40);
			cm.gainItem(1132013, 1);
			cm.dispose();
}
}

function action5(mode, type, selection) {
	switch (status) {
	case 2:
		if (cm.getPlayer().itemQuantity(4001623) < 40) {
			cm.sendOk("");
			cm.dispose();
			return;
			}
		if (cm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.EQUIP).getNumFreeSlot() < 1) {
			cm.sendOk("Thou dost not have enough Nett's Emeralds. lf thou wishes to receive #v1072619##b#t1072619##k, thou needs at least 40.");
			cm.dispose();
			return;
			}
			cm.gainItem(4001623, -40);
			cm.gainItem(1072619, 1);
			cm.dispose();
}
}

function action6(mode, type, selection) {
	switch (status) {
	case 2:
		if (cm.getPlayer().itemQuantity(4001623) < 40) {
			cm.sendOk("Thou dost not have enough Nett's Emeralds. lf thou wishes to receive #v1112682##b#t1112682##k, thou needs at least 40.");
			cm.dispose();
			return;
			}
		if (cm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.EQUIP).getNumFreeSlot() < 1) {
			cm.sendOk("It seems like you have no slots available in your Inventory. Could you check again?");
			cm.dispose();
			return;
			}
			cm.gainItem(4001623, -40);
			cm.gainItem(1112682, 1);
			cm.dispose();
}
}