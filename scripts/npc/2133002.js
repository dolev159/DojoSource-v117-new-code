/*
	名字:	艾靈森林里程碑
	地圖:	濃霧森林
	描述:	930000300
*/

function start() {
	cm.sendYesNo("Do you want to exit the Forest of Poison Haze? -Athena Pierce-");
}

function action(mode, type, selection) {
	switch (mode) {
	case 0:
		cm.sendNext("Take caution, for this is a danger zone..");
		break;
	case 1:
		cm.getPlayer().changeMap(cm.getMap(930000800), cm.getMap(930000800).getPortal(0));
		}
		cm.dispose();
}