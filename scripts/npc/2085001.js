/*
	名字:	天空之門
	地圖:	天渡
	描述:	240080000
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
		cm.dispose();
		return;
		}
		status--;
		break;
	case 1:
		status++;
		break;
		}
		reactor = 'action' + (cm.getPlayer().getMap().getId() == 240080000 ? 0 : 5);
		eval(reactor)(mode, type, selection);
}

function action0(mode, type, selection) {
	switch (status) {
	case 0:
		cm.sendSimple("#e<Party Quest: Dragon Rider>#n \r\nWelcome to the entrance to Crimson Sky. What would you like to do? \r\n#L1##bEnter Crimson Sky. (Lv. 120 or above/at least 3 players)#l\r\n#L2#Search for party#l\r\n#L3#Listen to the explanation.#l\r\n#L4#How many chances do I have left for today?#l");
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
		if (cm.getPlayer().getParty() == null) {
			cm.sendOk("Join a party, then try again.");
			cm.dispose();
			return;
		}
		if (cm.getPlayer().getParty().getLeader().getId() != cm.getPlayer().getId()) {
			cm.sendOk("Only the Party Leader can attempt to enter.");
			cm.dispose();
			return;
		}
		if (!cm.getPQEngine().startInstance(cm.getPlayer().getParty(), "Dragon Rider", cm)) {
			// Failed condition or another party is inside. Handled partially by cm inside handler, or we can send a default if not handled.
			// Actually the boolean return is false if requirements fail or already full.
		}
		cm.dispose();
		break;
	}
}

function action2(mode, type, selection) {
	switch (status) {
	case 1:
		cm.sendPartyWindow();
		cm.dispose();
}
}

function action3(mode, type, selection) {
	switch (status) {
	case 1:
		cm.sendOk("Go to the #b<Heavenly Doorway>#k and discover the true identity of the #rDragon Rider#k. You should be able to find him if you chase after him. On the way, you must defeat Wyverns by using the #bSoaring#k skill to fly. \r\n#e- Level#n: 120 or above (Recommended Level: 100 - 110 )  \r\n#e- Time Limit#n: 30 min \r\n#e- Players#n: 3 to 6 \r\n#e- Requir ement#n: Acquire the Soaring skill.");
		break;
	case 2:
		cm.dispose();
}
}

function action4(mode, type, selection) {
	switch (status) {
	case 1:
		cm.sendNext("You can do this quest 10more time(s) today.");
		break;
	case 2:
		cm.dispose();
}
}

function action5(mode, type, selection) {
	switch (status) {
	case 0:
		cm.sendYesNo("Do you wish to abandon the battle and leave the Crimson Sky area? To enter again, you must form a new party.");
		break;
	case 1:
		cm.getPlayer().changeMap(cm.getMap(240080000), cm.getMap(240080000).getPortal(0));
		cm.dispose();
}
}