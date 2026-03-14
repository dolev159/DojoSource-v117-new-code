/*
	名字:	樹根水晶
	地圖:	闇黑龍王洞穴入口
	描述:	240050400
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
		cm.sendNext("Think again and talk to me.");
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

function action240050100(mode, type, selection) {
	switch (status) {
	case 0:
		cm.sendSimple("Words are revealed on the surface of crystal tangled roots. \r\n#L0##bread the words carefully.#l\r\n#L1#Would you like to give up and get out?#l");
		break;
	case 1:
		if (selection < 1) {
			cm.sendNext("Only those who have the crystal key can enter the maze room. \r\nOnly those left can open the door of maze room. \r\ncan get what you want from glittering tree hole. \r\nThe key made on the flame shines in the cave.");
			cm.dispose();
			return;
			}
			cm.getPlayer().changeMap(cm.getMap(240050500), cm.getMap(240050500).getPortal(0));
			cm.dispose();
}
}

function action240050101(mode, type, selection) {
	switch (status) {
	case 0:
		cm.sendSimple("Words are revealed on the surface of crystal tangled roots. \r\n#L0##bread the words carefully.#l\r\n#L1#Would you like to give up and get out?#l");
		break;
	case 1:
		if (selection < 1) {
			cm.sendNext("You have to discard to earn something. \r\nYou can drop what you wish to drop in the glittering tree hole.");
			cm.dispose();
			return;
			}
			cm.getPlayer().changeMap(cm.getMap(240050500), cm.getMap(240050500).getPortal(0));
			cm.dispose();
}
}

function action240050102(mode, type, selection) {
	switch (status) {
	case 0:
		cm.sendSimple("Words are revealed on the surface of crystal tangled roots. \r\n#L0##bread the words carefully.#l\r\n#L1#Would you like to give up and get out?#l");
		break;
	case 1:
		if (selection < 1) {
			cm.sendNext("You have to discard to earn something. \r\nYou can drop what you wish to drop in the glittering tree hole.");
			cm.dispose();
			return;
			}
			cm.getPlayer().changeMap(cm.getMap(240050500), cm.getMap(240050500).getPortal(0));
			cm.dispose();
}
}

function action240050103(mode, type, selection) {
	switch (status) {
	case 0:
		cm.sendSimple("Words are revealed on the surface of crystal tangled roots. \r\n#L0##bread the words carefully.#l\r\n#L1#Would you like to give up and get out?#l");
		break;
	case 1:
		if (selection < 1) {
			cm.sendNext("You have to discard to earn something. \r\nYou can drop what you wish to drop in the glittering tree hole.");
			cm.dispose();
			return;
			}
			cm.getPlayer().changeMap(cm.getMap(240050500), cm.getMap(240050500).getPortal(0));
			cm.dispose();
}
}

function action240050104(mode, type, selection) {
	switch (status) {
	case 0:
		cm.sendSimple("Words are revealed on the surface of crystal tangled roots. \r\n#L0##bread the words carefully.#l\r\n#L1#Would you like to give up and get out?#l");
		break;
	case 1:
		if (selection < 1) {
			cm.sendNext("You have to discard to earn something. \r\nYou can drop what you wish to drop in the glittering tree hole.");
			cm.dispose();
			return;
			}
			cm.getPlayer().changeMap(cm.getMap(240050500), cm.getMap(240050500).getPortal(0));
			cm.dispose();
}
}

function action240050105(mode, type, selection) {
	switch (status) {
	case 0:
		cm.sendSimple("Words are revealed on the surface of crystal tangled roots. \r\n#L0##bread the words carefully.#l\r\n#L1#Would you like to give up and get out?#l");
		break;
	case 1:
		if (selection < 1) {
			cm.sendNext("When you find the key made on the flame, you'll see the end of the maze.");
			cm.dispose();
			return;
			}
			cm.getPlayer().changeMap(cm.getMap(240050500), cm.getMap(240050500).getPortal(0));
			cm.dispose();
}
}

function action240050200(mode, type, selection) {
	switch (status) {
	case 0:
		cm.sendSimple("Words are revealed on the surface of crystal tangled roots. \r\n#L0##bread the words carefully.#l\r\n#L1#Would you like to give up and get out?#l");
		break;
	case 1:
		if (selection < 1) {
			cm.sendNext("Darkness is connected to darkness, and light to light. \r\nYour choice always makes results.");
			cm.dispose();
			return;
			}
			cm.getPlayer().changeMap(cm.getMap(240050500), cm.getMap(240050500).getPortal(0));
			cm.dispose();
}
}

function action240050300(mode, type, selection) {
	switch (status) {
	case 0:
		cm.sendSimple("Words are revealed on the surface of crystal tangled roots. \r\n#L0##bread the words carefully.#l\r\n#L1#Would you like to give up and get out?#l");
		break;
	case 1:
		if (selection < 1) {
			cm.sendNext("The key made in the ice shines the cave.");
			cm.dispose();
			return;
			}
			cm.getPlayer().changeMap(cm.getMap(240050500), cm.getMap(240050500).getPortal(0));
			cm.dispose();
}
}

function action240050310(mode, type, selection) {
	switch (status) {
	case 0:
		cm.sendSimple("Words are revealed on the surface of crystal tangled roots. \r\n#L0##bread the words carefully.#l\r\n#L1#Would you like to give up and get out?#l");
		break;
	case 1:
		if (selection < 1) {
			cm.sendNext("The key made in the ice shines the cave.");
			cm.dispose();
			return;
			}
			cm.getPlayer().changeMap(cm.getMap(240050500), cm.getMap(240050500).getPortal(0));
			cm.dispose();
}
}

function action240050400(mode, type, selection) {
	switch (status) {
	case 0:
		cm.sendYesNo("Do you want to go back to #m240050000#");
		break;
	case 1:
		cm.getPlayer().changeMap(cm.getMap(240050000), cm.getMap(240050000).getPortal(0));
		cm.dispose();
}
}

function action240050500(mode, type, selection) {
	switch (status) {
	case 0:
		cm.sendSimple("The entrance of the cave is reflected on the crystal. It seems you can get there when touching it. \r\n#L0##btouch the crystal#l");
		break;
	case 1:
		cm.getPlayer().changeMap(cm.getMap(240050000), cm.getMap(240050000).getPortal(0));
		cm.dispose();
}
}

function action240060000(mode, type, selection) {
	switch (status) {
	case 0:
		cm.sendYesNo("Do you want to give up squad and quit?");
		break;
	case 1:
		cm.getPlayer().changeMap(cm.getMap(240050400), cm.getMap(240050400).getPortal(0));
		cm.dispose();
}
}

function action240060100(mode, type, selection) {
	switch (status) {
	case 0:
		cm.sendYesNo("Do you want to give up squad and quit?");
		break;
	case 1:
		cm.getPlayer().changeMap(cm.getMap(240050400), cm.getMap(240050400).getPortal(0));
		cm.dispose();
}
}

function action240060200(mode, type, selection) {
	switch (status) {
	case 0:
		cm.sendYesNo("Do you want to give up squad and quit?");
		break;
	case 1:
		cm.getPlayer().changeMap(cm.getMap(240050400), cm.getMap(240050400).getPortal(0));
		cm.dispose();
}
}