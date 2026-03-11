/*
	名字:	隱藏地圖
	地圖:	武英的倉庫
	描述:	910510700
*/

function start() {
	if (cm.getPlayer().itemQuantity(4033188)) {
		cm.getClient().getSession().write(Packages.tools.packet.CWvsContext.serverNotice(5, "You've already taken everything."));
		cm.dispose();
		return;
		}
	if (cm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.ETC).getNumFreeSlot() < 1) {
		cm.getClient().getSession().write(Packages.tools.packet.CWvsContext.serverNotice(5, "You can't carry any more items."));
		cm.dispose();
		return;
		}
		cm.sendOk("(You retrieve what appears to be Tristan's Keepsake.)");
		cm.gainItem(4033188, 1);
		cm.dispose();
}