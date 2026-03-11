/*
	名字:	楓之谷管理者
	地圖:	自由市場快速移動
	描述:	自由市場快速移動
*/

function start() {
	cm.sendYesNo("要移動到能夠和其他玩家交換物品的#b<自由市場>#k嗎？");
}

function action(mode, type, selection) {
	if (mode > 0) {
		cm.getPlayer().saveLocation(Packages.server.maps.SavedLocationType.fromString("FREE_MARKET"));
		cm.getPlayer().changeMap(cm.getMap(910000000), cm.getMap(910000000).getPortal(34));
		}
		cm.dispose();
}