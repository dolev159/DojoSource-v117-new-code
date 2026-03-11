/*
	名字:	達爾利
	地圖:	邱比特公園
	描述:	100000200
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
		reactor = 'action' + (cm.getPlayer().getMap().getId() == 100000200 ? 0 : cm.getPlayer().getMap().getId() == 910010500 ? 1 : 9);
		eval(reactor)(mode, type, selection);
}

function action0(mode, type, selection) {
	switch (status) {
	case 0:
		cm.sendNext("#e<Party Quest: Moon Bunny's Rice Cake>#n \r\n\r\nAre you interested in a teamwork-based party quest? Then come visit me via the Dimensional Mirror!");
		break;
	case 1:
		cm.dispose();
}
}

function action1(mode, type, selection) {
	reactor = 'action' + (cm.getPlayer().getParty() == null ? 2 : 3);
	eval(reactor)(mode, type, selection);
}

function action2(mode, type, selection) {
	switch (status) {
	case 0:
		cm.sendYesNo("You must have a party to do party quests. Do you want to use the Party Search Bulletin Board to find members?");
		break;
	case 1:
		cm.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.sendUIWindow(7, 1));
		cm.dispose();
}
}

function action3(mode, type, selection) {
	switch (status) {
	case 0:
		cm.sendSimple("#e<Party Quest: Moon Bunny's Rice Cake>#n \r\nHello, I'm Tory. Have you been to Primrose Hill? It's a beautiful hill where primroses bloom. I hear that a tiger named Growlie over at Primrose Hill is hungry. Won't you go with your party members and help Growlie? \r\n#L4##bGo to Primrose Hill.#l\r\n#L5#Learn about Primrose Hill.#l\r\n#L6#I would like to give you the rest of Rice Cake.#l");
		break;
	default:
		if (status == 1 && type == 5) select = selection;
		reactor = 'action' + select;
		eval(reactor)(mode, type, selection);
}
}

function action4(mode, type, selection) {
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
		if (party.get(i).getMapid() != 910010500) {
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
			var em = cm.getEventManager("HenesysPQ");
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

function action5(mode, type, selection) {
	switch (status) {
	case 1:
		cm.sendOk("#e<Party Quest: Moon Bunny's Rice Cake>#n \r\nA mysterious Moon Bunny that only appears in #b#m910010000##k during full moons. #b#p1012112##k of #b#m100000200##k is looking for Maplers to find #rMoon Bunny's Rice Cake#k for #b#p1012114##k. If you want to meet the Moon Bunny, plant Primrose Seeds in the designated locations and summon forth a full moon. Protect the Moon Bunny from wild animals until all #r10 Rice Cakes#k are made. \r\n#e- Level#n: 10 or above #r(Recommended Level: 10 - 20 )#k  \r\n#e- Time Limit#n: 10 min. \r\n#e- Number of Participants#k: 3 to 6 \r\n#e- Items#n: #v4001101# A Rice Cake on Top of My Head \r\n#b(obtained by giving Tory 10 Rice Cakes.)");
		break;
	case 2:
		cm.dispose();
}
}

function action6(mode, type, selection) {
	switch (status) {
	case 1:
		cm.sendSimple("Oh, my! You brought Moon Bunny's Rice Cakes for me? Well, I've prepare some gifts to show you my appreciation. How many rice cakes do you want to give me? \r\n#L7##bMoon Bunny's Rice Cake x10 - A Rice Cake on Top of My Head#l\r\n#L8#Moon Bunny's Rice Cake x100 - Rice Cake Topper#l");
		break;
	default:
		reactor = 'action' + selection;
		eval(reactor)(mode, type, selection);
}
}

function action7(mode, type, selection) {
	switch (status) {
	case 2:
		if (cm.getPlayer().itemQuantity(4001101) < 10) {
			cm.sendNext("Are you sure you have enough cakes?");
			cm.dispose();
			return;
			}
		if (cm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.EQUIP).getNumFreeSlot() < 1) {
			cm.getClient().getSession().write(Packages.tools.packet.CWvsContext.serverNotice(1, "Equip item inventory is full."));
			cm.dispose();
			return;
			}
			cm.gainItem(4001101, -10);
			cm.gainItem(1002798, 1);
			cm.sendNext("Thank you so much. I'm really going to enjoy these cakes!");
			cm.dispose();
}
}

function action8(mode, type, selection) {
	switch (status) {
	case 2:
		if (cm.getPlayer().itemQuantity(4031592) < 100) {
			cm.sendNext("Are you sure you have enough cakes?");
			cm.dispose();
			return;
			}
		if (cm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.EQUIP).getNumFreeSlot() < 1) {
			cm.getClient().getSession().write(Packages.tools.packet.CWvsContext.serverNotice(1, "Equip item inventory is full."));
			cm.dispose();
			return;
			}
			cm.gainItem(4001101, -100);
			cm.gainItem(1003266, 1);
			cm.sendNext("Thank you so much. I'm really going to enjoy these cakes!");
			cm.dispose();
}
}

function action9(mode, type, selection) {
	switch (status) {
	case 0:
		cm.getPlayer().changeMap(cm.getMap(910010500), cm.getMap(910010500).getPortal(0));
		cm.dispose();
}
}