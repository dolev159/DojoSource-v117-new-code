/*
	名字:	被關在城內的冒險家
	地圖:	空中監獄
	描述:	921160600
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
		reactor = 'action' + (cm.getPlayer().getMap().getId() == 921160700 ? 1 : 0);
		eval(reactor)(mode, type, selection);
}

function action0(mode, type, selection) {
	switch (status) {
	case 0:
		cm.sendNext("Thank you, but this is not over yet. You must defeat Prison Guard Ani in order to escape safely.");
		break;
	case 1:
		cm.sendNextPrev("He is very evil. Please be careful.");
		break;
	case 2:
		cm.dispose();
}
}

function action1(mode, type, selection) {
	switch (status) {
	case 0:
		cm.sendSimple("Thank you so much for helping me. Finally, I can escape this place. \r\n#L0#How do I get out of here?#l");
		break;
	case 1:
		cm.sendNext("This is still a very dangerous place, so please be careful as you leave.");
		break;
	case 2:
		cm.getPlayer().changeMap(cm.getMap(921160000), cm.getMap(921160000).getPortal(0));
		cm.dispose();
}
}