/*
	名字:	隱藏地圖
	地圖:	陣之房
	描述:	910350221
*/

function start() {
	if (cm.getPlayer().itemQuantity(4033183)) {
		cm.getClient().getSession().write(Packages.tools.packet.CWvsContext.serverNotice(5, "You've already taken everything."));
		cm.dispose();
		return;
		}
	if (cm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.ETC).getNumFreeSlot() < 1) {
		cm.getClient().getSession().write(Packages.tools.packet.CWvsContext.serverNotice(5, "You can't carry any more because you're carrying too much."));
		cm.dispose();
		return;
		}
		cm.sendOk("(You take the book)");
		cm.gainItem(4033183, 1);
		cm.dispose();
}