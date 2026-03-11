/*
	名字:	艾靈
	地圖:	深沉精靈之林
	描述:	300030100
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
		cm.sendSimple("#e<Party Quest: Forest of Poison Haze>#n \r\nA mysterious force has poisoned the forest, and all of the soldiers at Altaire Camp are too busy to do anything. We need you! If you are #bLv. 70 or higher#k, you can help! \r\n#L0##bEnter Forest of Poison Haze.#l\r\n#L1#Listen to Elin's story.#l\r\n#L2#Ask about the Altaire Piece.#l\r\n#L3#Find a party.#l");
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
		if (party.size() < 4) {
			cm.sendNext("You cannot enter because your party doesn't have 4 members. You need 4 party members at Lv. 70 or higher to enter, so double-check and talk to me again.");
			cm.dispose();
			return;
			}
			for (var i = 0; i < party.size(); i++)
		if (party.get(i).getMapid() != 300030100) {
			cm.sendOk("One of your party members is in a different map. All party members must start together.");
			cm.dispose();
			return;
			}
			var em = cm.getEventManager("Ellin");
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
		cm.sendNext("This once was a clean, peaceful forest of fairies. But some time ago, a #rmysterious man in a black robe#k came, drove out the fairies, and started on a strange research. The forest is becoming more and more polluted because of his research. We must save the forest now!");
		break;
	case 2:
		cm.sendNextPrev("The soldiers of Altaire Camp say they can't hellp...they're too busy excavating or whatever. Won't you please help? \r\n#e- Level#n: 70 or higher #r(Recommended Level: 70 - 119 )#k  \r\n#e- Time Limit#n: 20 min. \r\n#e- Number of Participants#k: 3 to 5 \r\n#e- Reward#n: #v1032101:# #t1032101#");
		break;
	case 3:
		cm.dispose();
}
}

function action2(mode, type, selection) {
	switch (status) {
	case 1:
		cm.sendNext("Oh, that's an Altaire Fragment! Altaire Fragments can be used to make special earrings here in Altaire Camp. If you can scrounge up 40 Altaire Fragments, I can make some for you.");
		break;
	case 2:
		if (cm.getPlayer().itemQuantity(4001198) > 39) {
		if (cm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.EQUIP).getNumFreeSlot() < 1) {
			cm.sendNext("You don't have enough slots for me to give you #t1032101#. Talk to me again when you have one available.");
			cm.dispose();
			return;
			}
			cm.gainItem(4001198, -40);
			cm.gainItem(1032101, 1);
			cm.dispose();
			return;
			}
			cm.sendNextPrev("I'm afraid this isn't enough. If you want a #bBrilliant Altaire Earrings#k, bring me 40 Altaire Fragments.");
			break;
	case 3:
		cm.dispose();
}
}

function action3(mode, type, selection) {
	switch (status) {
	case 1:
		cm.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.sendUIWindow(7, 1));
		cm.dispose();
}
}