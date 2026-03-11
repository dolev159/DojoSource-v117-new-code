/*
	名字:	冰河
	地圖:	冰封絕壁
	描述:	921120700
*/

function start() {
	if (cm.getPlayer().itemQuantity(4032649) < 1) {
		cm.dispose();
		return;
		}
	if (cm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.USE).getNumFreeSlot() < 1) {
		cm.getClient().getSession().write(Packages.tools.packet.CWvsContext.serverNotice(1, "Use item inventory is full."));
		cm.dispose();
		return;
		}
		cm.sendYesNo("Would you like to take some Ancient Glacial Water?");
}

function action(mode, type, selection) {
	if (mode > 0) {
		cm.gainItem(4032649, -1);
		cm.gainItem(2022698, 1);
		cm.getClient().getSession().write(Packages.tools.packet.CWvsContext.getTopMsg("Ancient Glacial Water Obtained 1/1"));
		}
		cm.dispose();
}