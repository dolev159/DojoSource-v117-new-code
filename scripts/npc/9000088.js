/*
	名字:	楓之谷管理者
	地圖:	專業技術村快速移動
	描述:	專業技術村快速移動
*/

function start() {
	cm.sendYesNoS("Would you like to move to the legendary town of Ardentmill? In #bArdentmill#k, you can learn the 5 Profession skills of #bHerbalism, Mining, Equipment Crafting, Accessory Crafting, and Alchemy#k.", 4);
}

function action(mode, type, selection) {
	if (mode > 0) {
		cm.getPlayer().saveLocation(Packages.server.maps.SavedLocationType.fromString("ARDENTMILL"));
		cm.getPlayer().changeMap(cm.getMap(910001000), cm.getMap(910001000).getPortal(6));
		}
		cm.dispose();
}