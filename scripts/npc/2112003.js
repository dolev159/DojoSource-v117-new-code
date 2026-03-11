/*
	名字:	茱麗葉
	地圖:	卡帕萊特祕密之室
	描述:	261000021
*/

var map = [926110000, 926110001, 926110100, 926110300, 926110400];

var Text = [["This is the lab where rumors are abound that a suspicious noise can be heard from here every night. If there's anything hidden in here, it has to be in this place. Please look thoroughly into this lab."],
	["This is the tunnel that leads to the secret lab!! Once you go past this place, I'm sure you'll find SOMETHING inside!! You'll have to defeat these monsters in order to go through the tunnel."],
	["It looks like you're inside the lab, and... something about the beaker on top of the desk seems awfully suspicious. It looks like the beaker can hold something inside. Find something in this lab that you can fill up the beaker with."],
	["This... is a secret security tunnel created to hide something very important in Magatia. Only one person can enter one of these four tunnels at a time, and each room presents different platforms to step on.",
 	"But... if my instincts serve me right, there should be an easier way to pass this through your teamwork."],
	["Once you enter the tunnel at the end of this map, you'll enter the Center Lab. No one knows exactly what's inside there, so l suggest you brace yourself for the worst!!"]];

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
		cm.sendNext("Please think over carefully and let me know when you're ready.");
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
		reactor = 'action' + (cm.getPlayer().getMap().getId() == 261000021 ? 0 : 6);
		eval(reactor)(mode, type, selection);
}

function action0(mode, type, selection) {
	switch (status) {
	case 0:
		cm.sendSimple("#e<Party Quest: Romeo & Juliet>#n \r\nMagatia faces a grave threat. We need brave adventurers to help us. \r\n#L1##bListen to Juliet's story.#l\r\n#L2#Start the quest.#l\r\n#L3#Find a party.#l\r\n#L4#Make a necklace with Alcadno Marbles.#l\r\n#L5#Combine two necklaces into one.#l");
		break;
	default:
		if (status == 1 && type == 5) select = selection;
		reactor = 'action' + select;
		eval(reactor)(mode, type, selection);
}
}

function action1(mode, type, selection) {
	switch (status) {
	case 1:
		cm.sendNext("Romeo and I are in love. But I am an Alcadno, and he is a Zenumist. There's no hope for us to be together...");
		break;
	case 2:
		cm.sendNextPrev("The Alcadno and the Zenumist were not always enemies! There must be a way to bring peace to our two sides!");
		break;
	case 3:
		cm.sendNextPrev("But in spite of everything I've tried, Magatia is #bon the verge of war#k. It's all because #bsomeone stole the power source of both Zenumist and Alcadno#k. And the two sides are blaming each other for it!");
		break;
	case 4:
		cm.sendNextPrev("I got a tip that the real thief is #ba third party#k. If we're ever going to have peace -- and love for me and Romeo -- we need to find #bthe third party#k and stop his evil plan!");
		break;
	case 5:
		cm.sendNextPrev("Fight for the peace of Magatia! \r\n#e- Level#n: 70 or higher #r(Recommended Level: 70 - 119 )#k  \r\n#e- Time Limit#n: 20 min \r\n#e- Number of Participants#k: 4 \r\n#e- Reward#n: \r\n#v1122117# #t1122117# \r\n(Can be obtained from Juliet once you collect #r20 #b#t4001160#s#k.) \r\n#v1122118# #t1122118# \r\n(Can be obtained from 1 #b#t1122116##k and 1 #b#t1122117##k)");
		break;
	case 6:
		cm.dispose();
}
}

function action2(mode, type, selection) {
	switch (status) {
	case 1:
		if (cm.getPlayer().getParty() == null || cm.getPlayer().getParty().getLeader().getId() != cm.getPlayer().getId()) {
			cm.sendOk("The party leader can proceed to the next stage.");
			cm.dispose();
			return;
			}
			party = cm.getPlayer().getParty().getMembers();
		if (party.size() < 1) {
			cm.sendNext("Your party does not meet the requirements. You need a party with exactly four members to participate in this quest.");
			cm.dispose();
			return;
			}
			for (var i = 0; i < party.size(); i++)
		if (party.get(i).getMapid() != 261000021) {
			cm.sendNext("Some of your party members are in a different map. Make sure they're all here!");
			cm.dispose();
			return;
			}
			for (var i = 0; i < party.size(); i++)
		if (party.get(i).getLevel() < 70) {
			cm.sendNext("Someone in your party isn't above Lv. 70. Make sure you're all the right level for this quest!");
			cm.dispose();
			return;
			}
			var em = cm.getEventManager("Juliet");
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
		if (cm.getPlayer().itemQuantity(4001160) < 20) {
			cm.sendNext("To make Juliet's Pendant, we need 20 Alcadno Marbles. You seem to be missing a few.");
			cm.dispose();
			return;
			}
		if (cm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.EQUIP).getNumFreeSlot() < 1) {
			cm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(1, "Equip item inventory is full."));
			cm.dispose();
			return;
			}
			cm.gainItem(4001160, -20);
			cm.gainItem(1122117, 1);
			cm.sendNext("");
			cm.dispose();
}
}

function action5(mode, type, selection) {
	switch (status) {
	case 1:
		if (cm.getPlayer().itemQuantity(1122116) < 1 || cm.getPlayer().itemQuantity(1122117) < 1) {
			cm.sendNext("You need Romeo's Pendant and Juliet's Pendant to combine them.");
			cm.dispose();
			return;
			}
		if (cm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.EQUIP).getNumFreeSlot() < 1) {
			cm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(1, "Equip item inventory is full."));
			cm.dispose();
			return;
			}
			cm.gainItem(1122116, -1);
			cm.gainItem(1122117, -1);
			cm.gainItem(1122118, 1);
			cm.sendNext("");
			cm.dispose();
}
}

function action6(mode, type, selection) {
	switch (status) {
	case 0:
		cm.sendSimple("How can l help you? \r\n#L7##bWhere am I?#l\r\n#L8#I want to get out of here!#l");
		break;
	default:
		if (status == 1 && type == 5) select = selection;
		reactor = 'action' + select;
		eval(reactor)(mode, type, selection);
}
}

function action7(mode, type, selection) {
	switch (status) {
	case 1:
		for (var i = 0; i < map.length; i++)
		if (cm.getPlayer().getMap().getId() == map[i])
		map = i;
		cm.sendNext(Text[map][status-1]);
		break;
	default:
		Text[map][status-1] == undefined ? cm.dispose() : cm.sendNextPrev(Text[map][status-1]);
}
}

function action8(mode, type, selection) {
	switch (status) {
	case 0:
		cm.sendYesNo("Are you sure you want to forfeit the quest and leave this place?");
		break;
	case 1:
		cm.getPlayer().changeMap(cm.getMap(910010500), cm.getMap(910010500).getPortal(0));
		cm.dispose();
}
}