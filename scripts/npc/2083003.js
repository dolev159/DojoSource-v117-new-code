/*
	名字:	迷宮室碎片
	地圖:	迷宮室
	描述:	240050100
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
		reactor = 'action' + (cm.getMap(240050101).getReactorByName("passKey1").getState() > 0 && cm.getPlayer().getMap().getReactorByName("keyDrop1").getState() < 1 ? 1 : cm.getMap(240050102).getReactorByName("passKey2").getState() > 0 && cm.getPlayer().getMap().getReactorByName("keyDrop2").getState() < 1 ? 2 : cm.getMap(240050103).getReactorByName("passKey3").getState() > 0 && cm.getPlayer().getMap().getReactorByName("keyDrop3").getState() < 1 ? 3 : cm.getMap(240050104).getReactorByName("passKey4").getState() > 0 && cm.getPlayer().getMap().getReactorByName("keyDrop4").getState() < 1 ? 4 : 0);
		eval(reactor)(mode, type, selection);
}

function action0(mode, type, selection) {
	switch (status) {
	case 0:
		cm.sendNext("Marvelous stump. You may put something into deep black hole.");
		break;
	case 1:
		cm.dispose();
}
}

function action1(mode, type, selection) {
	switch (status) {
	case 0:
		cm.sendSimple("You may put something into the black hole on the stump. Put \r\n#L0##b#t4001088#.#l");
		break;
	case 1:
		if (cm.getPlayer().itemQuantity(4001088) < 1) {
			cm.sendNext("lose #t4001088# by any chance?");
			cm.dispose();
			return;
			}
			cm.gainItem(4001088, -1);
			cm.getPlayer().getMap().getReactorByName("keyDrop1").forceHitReactor(1);
			cm.getMap(240050101).broadcastMessage(Packages.tools.packet.CWvsContext.serverNotice(6, "The second door of the maze room opened."));
			cm.sendNext("The second door of the maze room opened.");
			break;
	case 2:
		cm.dispose();
}
}

function action2(mode, type, selection) {
	switch (status) {
	case 0:
		cm.sendSimple("You may put something into deep black hole. Put \r\n#L0##b#t4001089#.#l");
		break;
	case 1:
		if (cm.getPlayer().itemQuantity(4001089) < 1) {
			cm.sendNext("lose #t4001089# by any chance?");
			cm.dispose();
			return;
			}
			cm.gainItem(4001089, -1);
			cm.getPlayer().getMap().getReactorByName("keyDrop2").forceHitReactor(1);
			cm.getMap(240050102).broadcastMessage(Packages.tools.packet.CWvsContext.serverNotice(6, "The third door of the maze room opened."));
			cm.sendNext("The third door of the maze room opened.");
			break;
	case 2:
		cm.dispose();
}
}

function action4(mode, type, selection) {
	switch (status) {
	case 0:
		cm.sendSimple("You may put something into deep black hole. Put \r\n#L0##b#t4001090#.#l");
		break;
	case 1:
		if (cm.getPlayer().itemQuantity(4001090) < 1) {
			cm.sendNext("lose #t4001090# by any chance?");
			cm.dispose();
			return;
			}
			cm.gainItem(4001090, -1);
			cm.getPlayer().getMap().getReactorByName("keyDrop3").forceHitReactor(1);
			cm.getMap(240050103).broadcastMessage(Packages.tools.packet.CWvsContext.serverNotice(6, "The fourth door of the maze room opened."));
			cm.sendNext("The fourth door of the maze room opened.");
			break;
	case 2:
		cm.dispose();
}
}

function action3(mode, type, selection) {
	switch (status) {
	case 0:
		cm.sendSimple("You may put something into deep black hole.Put \r\n#L0##b#t4001091#.#l");
		break;
	case 1:
		if (cm.getPlayer().itemQuantity(4001091) < 1) {
			cm.sendNext("lose #t4001091# by any chance?");
			cm.dispose();
			return;
			}
			cm.gainItem(4001091, -1);
			cm.getPlayer().getMap().getReactorByName("keyDrop4").forceHitReactor(1);
			cm.getMap(240050104).broadcastMessage(Packages.tools.packet.CWvsContext.serverNotice(6, "The fifth door of the maze room opened."));
			cm.sendNext("The fifth door of the maze room opened.");
			break;
	case 2:
		cm.dispose();
}
}