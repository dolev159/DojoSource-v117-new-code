/*
	名字:	馬西姆斯
	地圖:	戰鬥廣場
	描述:	960000000
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
		cm.sendYesNo("Ready to head back to town?");
		break;
	case 1:
		cm.sendNext("Off you go!");
		break;
	case 2:
		var map = cm.getPlayer().getSavedLocation(Packages.server.maps.SavedLocationType.fromString("BATTLESQUARE"));
		if (map < 0) map = 100000000;

		cm.getPlayer().changeMap(cm.getMap(map), cm.getMap(map).getPortal(0));
		cm.getPlayer().clearSavedLocation(Packages.server.maps.SavedLocationType.fromString("BATTLESQUARE"));
		cm.dispose();
}
}