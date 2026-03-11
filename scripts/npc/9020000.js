/*
	名字:	拉克裏斯
	地圖:	第一次同行〈等待室〉
	描述:	910340700
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
		reactor = 'action' + (cm.getPlayer().getMap().getId() == 103000000 ? 0 : 1);
		eval(reactor)(mode, type, selection);
}

function action0(mode, type, selection) {
	switch (status) {
	case 0:
		cm.sendSimple("#e<Party Quest: First Time Together>#n \r\nHow would you like to complete a quest by working with your party members? Inside, you will find many obstacles that you will have to overcome with the help of your party members. \r\n#L0##bGo to the First Accompaniment Lobby.#l");
		break;
	case 1:
		cm.dispose();
		cm.getPlayer().saveLocation(Packages.server.maps.SavedLocationType.fromString("MULUNG_TC"));
		cm.getPlayer().changeMap(cm.getMap(910340700), cm.getMap(910340700).getPortal(0));
}
}

function action1(mode, type, selection) {
	switch (status) {
	case 0:
		cm.sendSimple("#e<Party Quest: First Time Together>#n \r\nInside, you'll find many obstacles that can only be solved by working with a party. Interested? Then have your #bParty Leader#k talk to me. \r\n#L2##bI want to do the Party Quest.#l\r\n#L3#I want to find party members who will join me.#l\r\n#L4#I want to hear the details.#l\r\n#L5#I want a Soft Jelly Shoes.#l");
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
		if (cm.getPlayer().getParty() == null || cm.getPlayer().getParty().getLeader().getId() != cm.getPlayer().getId()) {
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
		if (party.get(i).getMapid() != 910340700) {
			cm.sendNext("Some of your party members are in a different map. Make sure they're all here!");
			cm.dispose();
			return;
			}
			for (var i = 0; i < party.size(); i++)
		if (party.get(i).getLevel() < 20) {
			cm.sendNext("Some members of your party haven't reached Lv. 20 yet. Your party must have 3 players who are at least Lv. 20 characters to enter the area. Talk to me again when your party is ready.");
			cm.dispose();
			return;
			}
			var em = cm.getEventManager("KerningPQ");
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
		cm.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.sendUIWindow(7, 1));
		cm.dispose();
}
}

function action4(mode, type, selection) {
	switch (status) {
	case 1:
		cm.sendOk("Calling on all those with courage! Work together, share your strengths, and use your wisdom to find and defeat the vicious #rKing Slime#k! King Slime will appear once you complete certain challenges, such as collecting passes or answering location based quizzes. \r\n#e- Level#n: 20 or higher #r(Recommended Level: 20 - 69 )#k  \r\n#e- Time Limit#n: 20 min. \r\n#e- Number of Participants#k: 3 to 4 \r\n#e- Reward#n: #v1072369# Squishy Shoes #b(dropped by King Slime)#k  \r\n#e- Reward#n: #v1072533# Soft Jelly Shoes #b(exchanged for Smooshy Liquid x15)#k");
		break;
	case 2:
		cm.dispose();
}
}

function action5(mode, type, selection) {
	switch (status) {
	case 1:
		if (cm.getPlayer().itemQuantity(4001531) < 15) {
			cm.sendOk("If you want #v1072533# Soft Jelly Shoes, you'll need 15 #b#t4001531#s#k. You can obtain Smooshy Liquids by defeating #rKing Slime.");
			cm.dispose();
			return;
			}
		if (cm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.EQUIP).getNumFreeSlot() < 1) {
			cm.getClient().getSession().write(Packages.tools.packet.CWvsContext.serverNotice(1, "Equip item inventory is full."));
			cm.dispose();
			return;
			}
			cm.gainItem(4001531, -15);
			cm.gainItem(1072533, 1);
			cm.sendNext("Thank you so much.");
			cm.dispose();
}
}