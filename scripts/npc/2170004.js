/*
	名字:	戴摩斯
	地圖:	克里塞路口
	描述:	200100000
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
	switch (status) {
	case 0:
		cm.sendYesNo("Would you like to return to Orbis? Then come with me.");
		break;
	case 1:
		cm.sendNext("Don't just stand around. Leave!");
		break;
	case 2:
		cm.getPlayer().changeMap(cm.getMap(200000200), cm.getMap(200000200).getPortal(0));
		cm.dispose();
}
}