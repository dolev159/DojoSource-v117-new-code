/*
	名字:	湯瑪斯
	地圖:	弓箭手村
	描述:	100000000
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
		cm.sendNext("Ok, feel free to hang around until you're ready to go!");
		cm.dispose();
		return;
		}
		status--;
		break;
	case 1:
		status++;
		break;
		}
		reactor = 'action' + (cm.getPlayer().getMap().getId() == 100000000 ? 0 : 1);
		eval(reactor)(mode, type, selection);
}

function action0(mode, type, selection) {
	switch (status) {
	case 0:
		cm.sendYesNo("I can take you to the Amoria Village. Are you ready to go?");
		break;
	case 1:
		cm.sendNext("I hope you had a great time! See you around!");
		break;
	case 2:
		cm.getPlayer().changeMap(cm.getMap(680000000), cm.getMap(680000000).getPortal(0));
		cm.dispose();
}
}

function action1(mode, type, selection) {
	switch (status) {
	case 0:
		cm.sendYesNo("I can take you back to your original location. Are you ready to go?");
		break;
	case 1:
		cm.sendNext("I hope you had a great time! See you around!");
		break;
	case 2:
		cm.getPlayer().changeMap(cm.getMap(100000000), cm.getMap(100000000).getPortal(0));
		cm.dispose();
}
}