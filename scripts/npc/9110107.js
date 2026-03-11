/*
	名字:	轎子
	地圖:	楓葉古城外圍
	描述:	800040000
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
		if (status < 2) {
		cm.sendNext("Wait, are you not going to ride this?");
		cm.dispose();
		return;
		}
		status--;
		break;
	case 1:
		status++;
		break;
		}
		reactor = 'action' + (cm.getPlayer().getMap().getId() == 800000000 ? 0 : 1);
		eval(reactor)(mode, type, selection);
}

function action0(mode, type, selection) {
	switch (status) {
	case 0:
		cm.sendNext("We are... the palanquin... bearers! Need to... get to... Ninja Castle? Talk to us! Talk to us!");
		break;
	case 1:
		cm.sendYesNo("Huh, what?! You want to go to Ninja Castle?");
		break;
	case 2:
		cm.sendNext("Got it! We are... the palanquin.... bearers! We'll get you... there... faster than you can... blink! And since we're in such a jolly mood, you don't even have to pay us!");
		break;
	case 3:
		cm.getPlayer().changeMap(cm.getMap(800040000), cm.getMap(800040000).getPortal(0));
		cm.dispose();
}
}

function action1(mode, type, selection) {
	switch (status) {
	case 0:
		cm.sendNext("We are... the palanquin... bearers! Need to... get to... Mushroom Shrine? Talk to us! Talk to us!");
		break;
	case 1:
		cm.sendYesNo("Huh, what?! You want to go to the Mushroom Shrine?");
		break;
	case 2:
		cm.sendNext("Got it! We are... the palanquin.... bearers! We'll get you... there... faster than you can... blink! And since we're in such a jolly mood, you don't even have to pay us!");
		break;
	case 3:
		cm.getPlayer().changeMap(cm.getMap(800000000), cm.getMap(800000000).getPortal(0));
		cm.dispose();
}
}