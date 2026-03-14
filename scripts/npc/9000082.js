/*
	名字:	風
	地圖:	神殿出口
	描述:	950101100
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
		reactor = 'action' + (Math.floor(cm.getPlayer().getMap().getId() / 100 % 10) > 0 ? 1 : 0);
		eval(reactor)(mode, type, selection);
}

function action0(mode, type, selection) {
	switch (status) {
	case 0:
		cm.sendYesNo("Do you wish to exit the Sanctuary of Evil?");
		break;
	case 1:
		map = Math.floor(cm.getPlayer().getMap().getId() / 10000 % 10) > 0 ? 809061100 : 950101100;
		cm.getPlayer().changeMap(cm.getMap(map), cm.getMap(map).getPortal(0));
		cm.dispose();
}
}

function action1(mode, type, selection) {
	switch (status) {
	case 0:
		cm.sendYesNo("Do you wish to return to the Golden Temple?");
		break;
	case 1:
		map = Math.floor(cm.getPlayer().getMap().getId() / 10000 % 10) > 0 ? 809060000 : 950100000;
		cm.getPlayer().changeMap(cm.getMap(map), cm.getMap(map).getPortal(0));
		cm.dispose();
}
}