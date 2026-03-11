/*
	名字:	馬西姆斯
	地圖:	弓箭手村
	描述:	100000000
*/

function start() {
	cm.sendYesNo("Looking to test your strength in Battle Mode? Haha! I'll send you to Battle Square, where you can prove yourself by fighting other Maplers.");
}

function action(mode, type, selection) {
	if (mode > 0) {
		cm.getPlayer().saveLocation(Packages.server.maps.SavedLocationType.fromString("BATTLESQUARE"));
		cm.getPlayer().changeMap(cm.getMap(960000000), cm.getMap(960000000).getPortal(0));
		}
		cm.dispose();
}