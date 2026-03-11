/*
	名字:	幫傭易克
	地圖:	雅典娜禁地&amp;lt;中央塔&gt;
	描述:	920010100
*/

var item = [4001044, 4001045, 4001046, 4001047, 4001048, 4001049, 4001050, 4001051, 4001052, 4001053, 4001054, 4001055, 4001056, 4001057, 4001058, 4001059, 4001060, 4001061, 4001062, 4001063];


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
		cm.sendNext("Please think about it again and then talk to me.");
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
		eim = cm.getPlayer().getEventInstance();
		reactor = 'action' + cm.getPlayer().getMap().getId();
		eval(reactor)(mode, type, selection);
}

function action920010600(mode, type, selection) {
	switch (status) {
	case 0:
		cm.sendNext("Hi, my name is Eak, the Chamberlain of Minerva the Goddess. If you wish to save Minerva the Goddess who has turned into a stone statue, you have to find #bFragments of the Statue#k scattered all over the place. First of all, please go to <Walkway> and find the first fragment. The portal to <Walkway> is down here.");
		break;
	case 1:
		cm.dispose();
}
}

function action920010400(mode, type, selection) {
	reactor = 'action' + ((cm.getPlayer().getMap().getReactorByName("music").getState() > 0 && cm.getPlayer().getParty().getLeader().getId() == cm.getPlayer().getId()) ? 920010403 : eim.getProperty(cm.getPlayer().getName() + "stage4") == null ? 920010401 : 920010402);
	eval(reactor)(mode, type, selection);
}

function action920010401(mode, type, selection) {
	switch (status) {
	case 0:
		cm.sendNext("This is the Lobby of the Tower of Goddess. Goddess Minerva loved the way music sounded here. She used to play a different song each day.");
		break;
	case 1:
		cm.sendNextPrev("She enjoyed \r\n#bCute Music on Mondays, \r\nScary Music on Tuesdays, \r\nFun Music on Wednesdays, \r\nSad Music on Thursdays, \r\nCold Music on Fridays, \r\nTight Music on Saturdays, \r\nand Operatic Music on Sundays.#k \r\nHer tastes would change just like that.");
		break;
	case 2:
		eim.setProperty(cm.getPlayer().getName() + "stage4", 1);
		cm.dispose();
}
}

function action920010402(mode, type, selection) {
	switch (status) {
	case 0:
		cm.sendSimple("Maybe playing her favorite music will be a magical balm on Minerva's soul... \r\n#L0##bQuit Party Quest and leave#l");
		break;
	case 1:
		cm.sendYesNo("Do you really want to quit?");
		break;
	case 2:
		cm.getPlayer().changeMap(cm.getMap(920011200), cm.getMap(920011200).getPortal(0));
		cm.dispose();
}
}

function action920010403(mode, type, selection) {
	switch (status) {
	case 0:
		if (eim.getProperty("stage4") != null) {
			cm.sendOk("There is nothing left to do here. Please proceed to the next room.");
			cm.dispose();
			return;
			}
		if (cm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.ETC).getNumFreeSlot() < 1) {
			cm.sendOk("Please check to see if you have room in your Inventory.");
			cm.dispose();
			return;
			}
			eim.setProperty("stage4", 1);
			cm.gainItem(4001046, 1);
			cm.getPlayer().getMap().broadcastMessage(Packages.tools.packet.CField.environmentChange("quest/party/clear", 3));
			cm.getPlayer().getMap().broadcastMessage(Packages.tools.packet.CField.environmentChange("Party1/Clear", 4));
			cm.sendNext("Yes! This is the music that the Goddess listened to. Here, this is the first piece of the Statue of Goddess. Use it to restore the Statue of Goddess.");
			cm.getPlayer().getMap().broadcastMessage(Packages.tools.packet.CWvsContext.serverNotice(6, "" + cm.getPlayer().getName() + " Uobtained the first Statue of Goddess piece."));
	case 1:
		cm.dispose();
}
}

function action920010300(mode, type, selection) {
	reactor = 'action' + (cm.getPlayer().getMap().getAllMonstersThreadsafe().size() < 1 && cm.getPlayer().getParty().getLeader().getId() == cm.getPlayer().getId() ? 920010302 : 920010301);
	eval(reactor)(mode, type, selection);
}

function action920010301(mode, type, selection) {
	switch (status) {
	case 0:
		cm.sendSimple("This is the Storage Room of the Tower of Goddess. lt's become quite the home for Cellions. Can you thin them out, just a eliminate, while l look for the Statue of Goddess : 2nd Piece? \r\n#L0##bQuit Party Quest and leave#l");
		break;
	case 1:
		cm.sendYesNo("Do you really want to quit?");
		break;
	case 2:
		cm.getPlayer().changeMap(cm.getMap(920011200), cm.getMap(920011200).getPortal(0));
		cm.dispose();
}
}

function action920010302(mode, type, selection) {
	switch (status) {
	case 0:
		if (eim.getProperty("stage3") != null) {
			cm.sendOk("There is nothing left to do here. Please proceed to the next room.");
			cm.dispose();
			return;
			}
		if (cm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.ETC).getNumFreeSlot() < 1) {
			cm.sendOk("Please check to see if you have room in your Inventory.");
			cm.dispose();
			return;
			}
			cm.gainItem(4001045, 1);
			eim.setProperty("stage3", 1);
			cm.sendNext("Thanks to you, the second Statue of Goddess piece has beenfound. Please use it to restore the Statue of Goddess.");
			cm.getPlayer().getMap().broadcastMessage(Packages.tools.packet.CWvsContext.serverNotice(6, "" + cm.getPlayer().getName() + " Uobtained the second Statue of Goddess piece."));
			break;
	case 1:
		cm.dispose();
}
}

function action920010200(mode, type, selection) {
	reactor = 'action' + (eim.getProperty("stage2a") != null && cm.getPlayer().getParty().getLeader().getId() == cm.getPlayer().getId() ? 920010202 : 920010201);
	eval(reactor)(mode, type, selection);
}

function action920010201(mode, type, selection) {
	switch (status) {
	case 0:
		cm.sendSimple("This is the Tower of Goddess walkway. The Pixies have divided the Statue of Goddess Piece into 30 smaller pieces, and scattered them. I guess they're just trying to be jerks or something. Anyway, please defeat the Pixies and gather up the pieces. If you bring me all 30 pieces. I'll give you the third Goddess Statue Piece. The Pixies have grown stronger from the Goddess Statue pieces, so please be careful. \r\n#L0##bQuit Party Quest and leave#l");
		break;
	case 1:
		cm.sendYesNo("Do you really want to quit?");
		break;
	case 2:
		cm.getPlayer().changeMap(cm.getMap(920011200), cm.getMap(920011200).getPortal(0));
		cm.dispose();
}
}

function action920010202(mode, type, selection) {
	switch (status) {
	case 0:
		if (eim.getProperty("stage2") != null) {
			cm.sendOk("There is nothing left to do here. Please proceed to the next room.");
			cm.dispose();
			return;
			}
			cm.sendNext("Ooh! You've gathered all the pieces! With these, I can make a #bGoddess Statue: 3rd Piece#k. I will make it for you now!");
			break;
	case 1:
		if (cm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.ETC).getNumFreeSlot() < 1) {
			cm.sendOk("Please check to see if you have room in your Inventory.");
			cm.dispose();
			return;
			}
			cm.gainItem(4001048, 1);
			eim.setProperty("stage2", 1);
			cm.sendOk("Here, please take this Statue of Goddess piece and restore the Statue.");
			cm.getPlayer().getMap().broadcastMessage(Packages.tools.packet.CWvsContext.serverNotice(6, "" + cm.getPlayer().getName() + " Uobtained the fourth Statue of Goddess piece."));
			break;
	case 2:
		cm.dispose();
}
}

function action920010700(mode, type, selection) {
	reactor = 'action' + (eim.getProperty("stage7a") != null && cm.getPlayer().getParty().getLeader().getId() == cm.getPlayer().getId() ? 920010702 : 920010701);
	eval(reactor)(mode, type, selection);
}

function action920010701(mode, type, selection) {
	switch (status) {
	case 0:
		cm.sendSimple("This is a path that leads to the top of the Tower of Goddess. At the top, you'll find two levers that open the door to the roof. lf you try the levers, you'll figure out which ones are right. \r\n#L0##bQuit Party Quest and leave#l");
		break;
	case 1:
		cm.sendYesNo("Do you really want to quit?");
		break;
	case 2:
		cm.getPlayer().changeMap(cm.getMap(920011200), cm.getMap(920011200).getPortal(0));
		cm.dispose();
}
}

function action920010702(mode, type, selection) {
	switch (status) {
	case 0:
		if (eim.getProperty("stage7") != null) {
			cm.sendOk("There is nothing left to do here. Please proceed to the next room.");
			cm.dispose();
			return;
			}
		if (cm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.ETC).getNumFreeSlot() < 1) {
			cm.sendOk("Please check to see if you have room in your Inventory.");
			cm.dispose();
			return;
			}
			cm.gainItem(4001049, 1);
			eim.setProperty("stage7", 2);
			cm.getPlayer().getMap().broadcastMessage(Packages.tools.packet.CWvsContext.serverNotice(6, "" + cm.getPlayer().getName() + " Uobtained the third Statue of Goddess piece."));
			cm.sendNext("You handled those levers like a pro! Now that the fourth Statue of Goddess piece has been found, hurry and restore the Statue of Goddess.");
			break;
	case 1:
		cm.dispose();
}
}

function action920010100(mode, type, selection) {
	reactor = 'action' + (cm.getMap(920010100).getReactorByName("minerva").getState() > 3 && cm.getPlayer().getParty().getLeader().getId() == cm.getPlayer().getId() ? 920010102 : 920010101);
	eval(reactor)(mode, type, selection);
}

function action920010101(mode, type, selection) {
	switch (status) {
	case 0:
		cm.sendSimple("Which action would you like to take? \r\n#L0##bI want to listen to Eak#l\r\n#L1#Quit Party Quest and leave#l");
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
		cm.sendNext("#bMinerva#k is locked up next to the shattered Goddess Statue next to me. We need to collect #bfour fragments#k to restore the statue, and then bring the #bGrass of Life#k to revive Minerva.");
		break;
	case 2:
		cm.sendNextPrev("Please explore all parts of the tower to get #bstatue pieces#k and then the #bgrass of life#k to revive Minerva!");
		break;
	case 3:
		cm.dispose();
}
}

function action1(mode, type, selection) {
	switch (status) {
	case 1:
		cm.sendYesNo("Do you really want to quit?");
		break;
	case 2:
		cm.getPlayer().changeMap(cm.getMap(920011200), cm.getMap(920011200).getPortal(0));
		cm.dispose();
}
}

function action920010102(mode, type, selection) {
	switch (status) {
	case 0:
		if (cm.getMap(920010100).getReactorByName("minerva").getState() > 4) {
			cm.sendOk("Thank you so much for rescuing the Goddess Minerva.");
			cm.dispose();
			return;
			}
		if (cm.getMap(920010800).getReactorById(2001001).getState() > 0) {
			cm.sendNext("The Goddess Minerva will revive when a party member with the Grass of Life clicks on the Goddess Statue.");
			cm.dispose();
			return;
			}
			cm.sendNext("Aha! The Goddess Statue has been fully restored. Thank you so much! Now, we'll be able to revive the Goddess Minerva with the Grass of Life. You can find the Grass of Life in the Tower of Goddess garden. I will send all of you there now.");
			break;
	case 1:
		cm.dispose();
		for (var i = 0; i < eim.getPlayers().size(); i++)
		eim.getPlayers().get(i).changeMap(eim.getMapInstance(920010800), eim.getMapInstance(920010800).getPortal(0));
}
}

function action920010800(mode, type, selection) {
	reactor = 'action' + (cm.getMap(920010800).getReactorById(2001001).getState() > 0 && cm.getPlayer().getMap().getMonsterById(9300039) == null ? 920010802 : 920010801);
	eval(reactor)(mode, type, selection);
}

function action920010801(mode, type, selection) {
	switch (status) {
	case 0:
		cm.sendSimple("This is the Tower of Goddess garden. The #bGrass of Life#k, which can revive the Goddess Minerva, can be found here. Papa Pixie, who sealed the Goddass in the statue, guards the Grass of Life. To summon Papa Pixie to battle, we must locate the pot the Dark Nependeath grows in. \r\n#L0##bQuit Party Quest and leave#l");
		break;
	case 1:
		cm.sendYesNo("Do you really want to quit?");
		break;
	case 2:
		cm.getPlayer().changeMap(cm.getMap(920011200), cm.getMap(920011200).getPortal(0));
		cm.dispose();
}
}

function action920010802(mode, type, selection) {
	switch (status) {
	case 0:
		if (cm.getPlayer().getParty().getLeader().getId() != cm.getPlayer().getId()) {
			cm.sendNext("Please have the party leader proceed.");
			cm.dispose();
			return;
			}
		if (eim.getProperty("stage8") != null) {
			cm.sendNext("You already have the Grass of Life, Use it to rescue the Goddess Minerva!");
			cm.dispose();
			return;
			}
			cm.sendNext("You've defeated Papa Pixie! He dropped the Grass of Life, which we need to revive the Goddess Minerva. Take this and go to the center room to rescue the Goddess.");
			break;
	case 1:
		if (cm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.ETC).getNumFreeSlot() < 1) {
			cm.sendOk("Please check to see if you have room in your Inventory.");
			cm.dispose();
			return;
			}
			cm.gainItem(4001055, 1);
			eim.setProperty("stage8", 1);
			cm.sendOk("Now, please go free the Goddess Minerva. You can enter the center room through that portal.");
			break;
	case 2:
		cm.dispose();
}
}

function action920010900(mode, type, selection) {
	switch (status) {
	case 0:
		cm.dispose();
}
}

function action920011000(mode, type, selection) {
	switch (status) {
	case 0:
		cm.dispose();
}
}

function action920011200(mode, type, selection) {
	switch (status) {
	case 0:
		cm.sendNext("I wil now send you to The Unknown Tower.");
		break;
	case 1:
		cm.dispose();
		for (var i = 0; i < item.length; i++)
		cm.getPlayer().removeAll(item[i]);
		cm.getPlayer().changeMap(cm.getMap(200080101), cm.getMap(200080101).getPortal(0));
}
}