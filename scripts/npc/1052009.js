/*
	名字:	寶箱
	地圖:	地鐵車庫
	描述:	910360102
*/

function start() {
	if (cm.getPlayer().getPosition().x < -50 || cm.getPlayer().getPosition().x > 250 || cm.getPlayer().getPosition().y > 600) {
		cm.sendOk("You cannot see very well because you're too far. Go a little closer.");
		cm.dispose();
		return;
		}
	if (cm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.ETC).getNumFreeSlot() < 1) {
		cm.sendNext("Looking carefully into Treasure Box, there seems to be a shiny object inside but since your etc. inventory is full, that item is unattainable.");
		cm.dispose();
		return;
		}
		cm.gainItem(4031040, cm.getPlayer().itemQuantity(4031040) ? 0 : 1);
		cm.sendNext("Looking carefully into Treasure Box, there seems to be a stack of papers in there. I reached out my hand and voila, a huge stack of money.");
}

function action(mode, type, selection) {
	if (mode > 0)
		cm.getPlayer().changeMap(cm.getMap(103020000), cm.getMap(103020000).getPortal(0));
		cm.dispose();
}