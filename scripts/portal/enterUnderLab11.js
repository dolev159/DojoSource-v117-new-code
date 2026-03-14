/*
	名字:	隱藏地圖
	地圖:	傑利麥勒實驗室入口
	描述:	931000640
*/

function enter(pi) {
	if (pi.getPlayer().itemQuantity(4033095) < 1) {
	if (pi.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.ETC).getNumFreeSlot() < 1) {
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "You don't have enough room in your Inventory for this..."));
		return false;
		}
		pi.gainItem(4033095, 1);
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "What's this...a Research Journal? Take it to Claudine!"));
		}
		return false;
}