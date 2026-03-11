/*
	名字:	說話的樹
	地圖:	詭異的黑斧木妖的出現地
	描述:	910100100
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
		cm.sendYesNo("You want to get out of here? I'll let you out if you want.");
		break;
	case 1:
		cm.sendNext("All right, let's go back.");
		break;
	case 2:
		cm.getPlayer().changeMap(cm.getMap(101010000), cm.getMap(101010000).getPortal(0));
		cm.dispose();
}
}