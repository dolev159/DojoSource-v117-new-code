/*
	名字:	波斯貓
	地圖:	昭和村
	描述:	801000000
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
		if (status < 1) {
		cm.sendNext("You don't have the courage to face these questions. I knew it...out of my sight!");
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
		if (cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(8012)).getStatus() != 1) {
			cm.sendOk("Haha... you dare attempt to anwer my wickedly hard questions? Well, they aren't free--but the prize is worth it!");
			cm.dispose();
			return;
			}
		if (cm.getPlayer().itemQuantity(4031064)) {
			cm.sendOk("Meeeoooowww!");
			cm.dispose();
			return;
			}
		if (cm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.ETC).getNumFreeSlot() < 1) {
			cm.sendOk("Please make sure you have at least 1 empty slot in your Etc tab.");
			cm.dispose();
			return;
			}
			cm.sendYesNo("Did you get them all? Are you going to try to answer all of my questions?");
			break;
	case 1:
		if (cm.getPlayer().itemQuantity(2020001) < 300) {
			cm.sendNext("Hey, are you sure you brought the 300 Fried Chickens I asked for? Check again and see if you brought enough.");
			cm.dispose();
			return;
			}
			cm.gainItem(2020001, -300)
			cm.sendNext("Good job! The alley cats are gonna feast tonight! Now, on to my questions. I'm sure you're aware of this, but remember, if you get a single one wrong, it's over. This is all or nothing!");
			break;
	case 2:
		cm.sendSimple("Question no.1: What's the name of the vegetable store owner in Showa Town? \r\n#L0##bSami#l\r\n#L1#Kami#l\r\n#L2#Umi#l");
		break;
	case 3:
		if (selection != 2) {
			cm.sendOk("Hmmm...all humans make mistakes! If you want to take another crack at it, then bring me 300 Fried Chickens.");
			cm.dispose();
			return;
			}
			cm.sendSimple("Question no.2: Which of these NPCs does NOT stand in front of the movie theater at Showa Town? \r\n#L0##bSky#l\r\n#L1#Furano#l\r\n#L2#Shinta#l");
			break;
	case 4:
		if (selection != 2) {
			cm.sendOk("Hmmm...all humans make mistakes! If you want to take another crack at it, then bring me 300 Fried Chickens.");
			cm.dispose();
			return;
			}
			cm.sendSimple("Question no.3: What is the name of NPC that transfers travelers from Showa Town to the Mushroom Shrine? \r\n#L0##bPerry#l\r\n#L1#Spinel#l\r\n#L2#Transporter#l");
			break;
	case 5:
		if (selection != 0) {
			cm.sendOk("Hmmm...all humans make mistakes! If you want to take another crack at it, then bring me 300 Fried Chickens.");
			cm.dispose();
			return;
			}
			cm.sendNext("Wow, you answered all the questions correctly! I may not be the most fond of humans, but I HATE breaking a promise! So, as promised, here's the Orange Marble. You earned it!");
			break;
	case 6:
		cm.gainItem(4031064, 1);
		cm.sendOk("Our business is concluded, thank you very much! You can leave now!");
		break;
	case 7:
		cm.dispose();
}
}