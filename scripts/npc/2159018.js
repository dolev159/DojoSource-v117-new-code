/*
	名字:	潘
	地圖:	冰雪平原入口
	描述:	932000000
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
		cm.sendNext("Ask friends to join your party. Use the Party Search tab in the party window (hotkey P) to find a party anywhere, anytime.");
		cm.dispose();
		return;
		}
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
		reactor = 'action' + (cm.getPlayer().getParty() == null ? 0 : 1);
		eval(reactor)(mode, type, selection);
}

function action0(mode, type, selection) {
	switch (status) {
	case 0:
		cm.sendYesNo("You must have a party to do party quests. Do you want to use the Party Search Bulletin Board to find members?");
		break;
	case 1:
		cm.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.sendUIWindow(7, 1));
		cm.dispose();
}
}

function action1(mode, type, selection) {
	switch (status) {
	case 0:
		cm.sendSimple("#e<Party Quest: The Ice Knight's Curse>#n \r\nShhh! The Ice Knight will find us if we are loud! If you get cursed, you'll end up like my friend. Do you want that? No? Then help my friend break his curse! \r\n#L2##bOkay, I'll help your friend.#l\r\n#L3#I need more details.#l\r\n#L4#Look, I just want the Ice Knight's special item.#l");
		break;
	default:
		if (status == 1 && type == 5) select = selection;
		reactor = 'action' + select;
		eval(reactor)(mode, type, selection);
}
}

function action2(mode, type, selection) {
	switch (status) {
	case 1:
		if (cm.getPlayer().getParty().getLeader().getId() != cm.getPlayer().getId()) {
			cm.sendOk("You can't enter alone. If you want to enter, the party leader must talk to me. Ask your party leader to do so.");
			cm.dispose();
			return;
			}
			party = cm.getPlayer().getParty().getMembers();
		if (party.size() < 3) {
			cm.sendNext("You cannot enter because your party doesn't have 3 members. You need 3 party members at Lv. 20 or higher to enter, so double-check and talk to me again.");
			cm.dispose();
			return;
			}
			for (var i = 0; i < party.size(); i++)
		if (party.get(i).getMapid() != 932000000) {
			cm.sendNext("Some of your party members are in a different map. Make sure they're all here!");
			cm.dispose();
			return;
			}
			cm.sendNext("Oh, thank you. Please eliminate Ice Knight with my friend. Defeating him will break the curse. Just...make sure you take care of Von, okay? Good luck.");
			break;
	case 2:
			var em = cm.getEventManager("Iceman");
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

function action3(mode, type, selection) {
	switch (status) {
	case 1:
		cm.sendNext("When I was younger, I always thought the other boys were really childish and annoying. Jun, though... Jun was different. He always followed and listened to me. He was scared a lot, even when we were just playing hide-and-seek. I always laughed at him, for getting scared of a silly game...");
		break;
	case 2:
		cm.sendNextPrev("Maybe that's why he tried so hard to be brave. And then...he was cursed by the Ice Knight. I...I can't help but feel responsible, you see? Please, l beg of you...break his curse before it's too late.");
		break;
	case 3:
		cm.dispose();
}
}

function action4(mode, type, selection) {
	switch (status) {
	case 1:
		cm.sendSimple("I heard that when you eliminate the Ice Knight, you can get a #bCold Ice Fragment#k. You can make either #v1032100# #b#t1032100##k or #v1072510# #b#t1072510##k with that Cold Ice Fragment. Also, if you eliminate the Ice Knight and break Jun's curse, l will give you the Cold Ice Fragment. \r\n#L5##v1032100# #t1032100# - 20 Cold Ice Fragments#l\r\n#L6##v1072510# #t1072510# - 10 Cold Ice Fragments#l");
		break;
	default:
		if (status == 2 && type == 5) select = selection;
		reactor = 'action' + select;
		eval(reactor)(mode, type, selection);
}
}

function action5(mode, type, selection) {
	switch (status) {
	case 2:
		if (cm.getPlayer().itemQuantity(4001529) < 20) {
			cm.sendOk("Are you sure you have enough #b#t4001529##k? Don't try to fool me.");
			cm.dispose();
			return;
			}
		if (cm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.EQUIP).getNumFreeSlot() < 1) {
			cm.getClient().getSession().write(Packages.tools.packet.CWvsContext.serverNotice(1, "Equip item inventory is full."));
			cm.dispose();
			return;
			}
			cm.gainItem(4001529, -20);
			cm.gainItem(1032100, 1);
			cm.sendNext("Thank you so much.");
			cm.dispose();
}
}

function action6(mode, type, selection) {
	switch (status) {
	case 2:
		if (cm.getPlayer().itemQuantity(4001529) < 10) {
			cm.sendOk("Are you sure you have enough #b#t4001529##k? Don't try to fool me.");
			cm.dispose();
			return;
			}
		if (cm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.EQUIP).getNumFreeSlot() < 1) {
			cm.getClient().getSession().write(Packages.tools.packet.CWvsContext.serverNotice(1, "Equip item inventory is full."));
			cm.dispose();
			return;
			}
			cm.gainItem(4001529, -10);
			cm.gainItem(1072510, 1);
			cm.sendNext("Thank you so much.");
			cm.dispose();
}
}