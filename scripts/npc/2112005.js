/*
	名字:	茱麗葉
	地圖:	特殊實驗室
	描述:	926110200
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
		cm.sendNext("Please think over carefully and let me know when you're ready.");
		cm.dispose();
		return;
		}
		if (status < 1) {
		cm.dispose();
		return;
		}
		status--;
		break;
	case 1:
		status++;
		break;
		}
		reactor = 'action' + cm.getPlayer().getMap().getId();
		eval(reactor)(mode, type, selection);
}

function action926110200(mode, type, selection) {
	reactor = 'action' + (cm.getPlayer().itemQuantity(4001130) ? 1 : cm.getPlayer().itemQuantity(4001134) ? 2 : cm.getPlayer().itemQuantity(4001135) ? 3 : 4);
	eval(reactor)(mode, type, selection);
}

function action1(mode, type, selection) {
	switch (status) {
	case 0:
		cm.sendSimple("Wait a minute! That seal on the letter... isn't it... #b#t4001130##k? How come you have that with you? \r\n#L0##bThis letter is actually written for you, but it was dropped somewhere. It's for you.#l");
		break;
	case 1:
		cm.sendOk("Oh my... so he came here to stop the civll war of Magatia... the same reason I came here! If he's alone right now, he's in great danger!! We need to hurry!!");
		cm.getPlayer().getMap().broadcastMessage(Packages.tools.packet.CWvsContext.serverNotice(6, "Juliet seemed very much in shock after reading Romeo's letter."));
		cm.getMap(926110401).getReactorById(2619002).forceHitReactor(1);
		cm.gainItem(4001130, -1);
		cm.dispose();
}
}

function action2(mode, type, selection) {
	switch (status) {
	case 0:
		cm.sendSimple("Hey, isn't that #bAlcadno's Experiment Files#k? This should prove that the Zenumists are not responsible for stealing Alcadno's source of energy! Please give me that right now! \r\n#L0##bGive the Alcadno's Experiment Files to Juliet.#l");
		break;
	case 1:
		if (cm.getPlayer().getEventInstance().getProperty("Files") == null) {
			cm.sendOk("In order to stop the war, we still need to find a hard evidence that convinces the Zenumists that it's not Alcadno's fault. I'll leave the door open, so please find a concrete evidence for us!");
			cm.getPlayer().getEventInstance().setProperty("Files", 1);
			cm.gainItem(4001134, -1);
			cm.dispose();
			return;
			}
			cm.sendOk("Now that it's proven that neither Zenumist nor Alcadno are responsible for stealing each other's source of energy, the war can finally be prevented. Thank you so much for your hard work. I have opened the door that'll lead you to the next stage, so please find out who is responsible for this mess in the first place!!");
			cm.getPlayer().getMap().broadcastMessage(Packages.tools.packet.CField.environmentChange("quest/party/clear", 3));
			cm.getPlayer().getMap().broadcastMessage(Packages.tools.packet.CField.environmentChange("Party1/Clear", 4));
			cm.getPlayer().getMap().getReactorByName("jnr3_out3").forceHitReactor(1);
			cm.getPlayer().getMap().killAllMonsters(true);
			cm.getPlayer().getMap().setSpawns(false);
			cm.gainItem(4001134, -1);
			cm.dispose();
}
}

function action3(mode, type, selection) {
	switch (status) {
	case 0:
		cm.sendSimple("Ah, aren't these #bZenumist's Experiment Files#k? With these, we can prove that the Alcadno did not steal the Zenumist's source of energy! Please, give them to me! \r\n#L0##bGive the Zenumist's Experiment Files to Juliet.#l");
		break;
	case 1:
		if (cm.getPlayer().getEventInstance().getProperty("Files") == null) {
			cm.sendOk("ln order to stop the war, we still need to find a hard evidence that convinces the Alcadnos that it's not Zenumist's fault. I'll leave the door open, so please find a concrete evidence for us!");
			cm.getPlayer().getEventInstance().setProperty("Files", 1);
			cm.gainItem(4001135, -1);
			cm.dispose();
			return;
			}
			cm.sendOk("Now that it's proven that neither Zenumist nor Alcadno are responsible for stealing each other's source of energy, the war can finally be prevented. Thank you so much for your hard work. I have opened the door that'll lead you to the next stage, so please find out who is responsible for this mess in the first place!!");
			cm.getPlayer().getMap().broadcastMessage(Packages.tools.packet.CField.environmentChange("quest/party/clear", 3));
			cm.getPlayer().getMap().broadcastMessage(Packages.tools.packet.CField.environmentChange("Party1/Clear", 4));
			cm.getPlayer().getMap().getReactorByName("jnr3_out3").forceHitReactor(1);
			cm.getPlayer().getMap().killAllMonsters(true);
			cm.getPlayer().getMap().setSpawns(false);
			cm.gainItem(4001135, -1);
			cm.dispose();
}
}

function action4(mode, type, selection) {
	switch (status) {
	case 0:
		if (cm.getPlayer().getMap().getReactorByName("jnr3_out3").getState() > 0) {
			cm.sendNext("Please move to the next stage!!");
			cm.dispose();
			return;
			}
			cm.sendSimple("How can I help you? \r\n#L5##bWhere am we?#l\r\n#L6#I'd like to leave this place.#l");
			break;
	default:
		if (status == 1 && type == 5) select = selection;
		reactor = 'action' + select;
		eval(reactor)(mode, type, selection);
}
}

function action5(mode, type, selection) {
	switch (status) {
	case 1:
		cm.sendNext("I can't believe there's a place like this underneath Magatia!! This is most likely a secret lab of a scientist. I believe this person is responsible for stealing the energy sources of Alcadno and Zenumist and put Magatia in grave danger.");
		break;
	case 2:
		cm.sendNextPrev("First, in order to stop the war, we'll need to find a concrete evidence that this person is responsible for stealing the energy sources of Zenumist and Alcadno. There's got to be a #brecord of Alcadno and Zenumist#k somewhere in this lab, so please find that first.");
		break;
	case 3:
		cm.dispose();
}
}

function action6(mode, type, selection) {
	switch (status) {
	case 1:
		cm.sendYesNo("Are you sure you want to forfeit the quest and leave this place?");
		break;
	case 2:
		cm.getPlayer().changeMap(cm.getMap(926110700), cm.getMap(926110700).getPortal(0));
		cm.dispose();
}
}

function action926110401(mode, type, selection) {
	switch (status) {
	case 0:
		cm.sendNext("Thank you so much for your help in saving Romeo. Thank you so, so much.");
		break;
	case 1:
		if (cm.getPlayer().getParty().getLeader().getId() != cm.getPlayer().getId()) {
			cm.dispose();
			return;
			}
			cm.sendNextPrev("Unfortunately, Yulete got away from us, so this is not over yet. I doubt he is too far from here, so please find him right now!!");
			break;
	case 2:
		cm.warpMap(926110500, 0);
		cm.dispose();
}
}

function action926110600(mode, type, selection) {
	switch (status) {
	case 0:
		cm.sendNext("Thank you so much for helping us. Thanks to your hard work, we were able to prevent the Magatia Civil War from happening.");
		break;
	case 1:
		cm.sendNextPrev("Eventhough our love is still littered with obstacles, I can promise you that I will not give up in my quest to be with Romeo until the end.");
		break;
	case 2:
		cm.sendNextPrev("Here's the Alcadno Marble that I have had for the longest time. Please take it. I have also given you some rewards for the job well done. I will now lead your way out of here.");
		break;
	case 3:
		if (cm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.ETC).getNumFreeSlot() > 0) {
			cm.getPlayer().changeMap(cm.getMap(926110700), cm.getMap(926110700).getPortal(0));
			cm.gainItem(4001160, 1);
			cm.dispose();
			return;
			}
			cm.sendNextPrev("Is your use inventory or etc. inventory full? Unfortunately, we can't give you the reward if your inventory is full.");
			break;
	case 4:
		cm.dispose();
}
}

function action926100401(mode, type, selection) {
	switch (status) {
	case 0:
		cm.sendNext("Thank you so much for saving us. Your help was very much appreciated.");
		break;
	case 1:
		cm.dispose();
}
}

function action926100600(mode, type, selection) {
	switch (status) {
	case 0:
		cm.sendNext("Thank you so much for saving us. Your help was very much appreciated.");
		break;
	case 1:
		cm.dispose();
}
}