/*
	名字:	楓之谷管理者
	地圖:	自由市场快速移動
	描述:	自由市场村快速移動
*/

function start() {
	cm.sendYesNoS("Would you like to move to the #bFree Market#k, where you can trade items with other players?", 4);
}

function action(mode, type, selection) {
	if (mode > 0) {
		cm.getPlayer().saveLocation(Packages.server.maps.SavedLocationType.fromString("FREE_MARKET"));
		cm.getPlayer().changeMap(cm.getMap(910000000), cm.getMap(910000000).getPortal(6));
		}
		cm.dispose();
}