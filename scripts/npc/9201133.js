/*
	名字:	阿司塔洛之門
	地圖:	邪惡氣息的森林1
	描述:	101040310
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
		if (status < 3) {
		cm.dispose();
		return;
		}
		status--;
		break;
	case 1:
		status++;
		break;
		}
		reactor = 'action' + (cm.getPlayer().getMap().getId() == 101040310 ? 0 : cm.getPlayer().getMap().getId() % 10);
		eval(reactor)(mode, type, selection);
}

function action0(mode, type, selection) {
	switch (status) {
	case 0:
		cm.sendNext("#r[Requirements to Enter] \r\n\r\n#b      1.You must be under Level 40.");
		break;
	case 1:
		if (cm.getPlayer().getLevel() > 40) {
			cm.sendNextPrev("You must be under Level 40.");
			cm.dispose();
			return;
			}
			cm.sendSimple("An evil energy is emanating from this door. \r\nWould you like to enter? \r\n\r\n#L0##bYes#l\r\n#L1#No#l");
			break;
	case 2:
		if (selection < 1) {
			cm.getPlayer().changeMap(cm.getMap(677000011), cm.getMap(677000011).getPortal(0));
			cm.dispose();
			return;
			}
			cm.sendOk("Let me know when you are ready.");
			cm.dispose();
}
}

function action1(mode, type, selection) {
	switch (status) {
	case 0:
		cm.sendSimple("Astaroth is waiting for you behind this door. You can only participate in a party of 1 to 5 players and only enter Astaroth Hiding Place 5 times a day. \r\nWould you like to enter? \r\n\r\n#L0##bYes#l\r\n#L1#No#l");
		break;
	case 1:
		if (selection > 0) {
			cm.sendOk("Let me know when you are ready.");
			cm.dispose();
			return;
			}
			cm.sendYesNo("Do you want to go now?");
			break;
	case 2:
		cm.getPlayer().changeMap(cm.getMap(677000013), cm.getMap(677000013).getPortal(0));
		cm.dispose();
}
}

function action2(mode, type, selection) {
	switch (status) {
	case 0:
		cm.sendSimple("Would you like to exit to the #b#m101040310##k. \r\n\r\n#L2##bYes#l\r\n#L3#No#l");
		break;
	case 1:
		if (selection > 0) {
			cm.sendOk("Let me know when you are ready.");
			cm.dispose();
			return;
			}
			cm.getPlayer().changeMap(cm.getMap(101040310), cm.getMap(101040310).getPortal(0));
			cm.dispose();
}
}

function action3(mode, type, selection) {
	switch (status) {
	case 0:
		cm.sendSimple("At your service, friend. \r\n\r\n#L0##bI am prepared to fight Astaroth.#l\r\n#L1#Let me get outta here.#l");
		break;
	case 1:
		if (selection > 0) {
			cm.getPlayer().changeMap(cm.getMap(101040310), cm.getMap(101040310).getPortal(0));
			cm.dispose();
			return;
			}
		if (cm.getPlayer().getParty() == null || cm.getPlayer().getParty().getLeader().getId() != cm.getPlayer().getId()) {
			cm.sendNext("Please come with the leader of your party.");
			cm.dispose();
			return;
			}
			cm.sendSimple("I see that you are the Party Leader. Are you ready to enter Astaroth Hiding Place? \r\n\r\n#L4##bI'm ready, Let me in.#l");
			break;
	case 2:
		if (cm.getPlayer().getParty().getMembers().size() != 3) {
			cm.sendNext("I can only let you into Astaroth Hiding Place when you have at least 3 people in your party.");
			cm.dispose();
			return;
			}
			var em = cm.getEventManager("Astaroth");
			var prop = em.getProperty("state");
		if (prop == null || prop == 0) {
			em.startInstance(cm.getPlayer().getParty(), cm.getPlayer().getMap(), 200);
			cm.dispose();
			return;
			}
			cm.sendNext("Someone is already in Astaroth Hiding Place; I will let you in as soon as they exit. Please talk to me again after a short while.");
			break;
	case 3:
		cm.dispose();
}
}