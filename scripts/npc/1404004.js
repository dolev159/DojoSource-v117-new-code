/*
	名字:	舊書堆
	地圖:	亞凱斯特的研究室
	描述:	920030101
*/

function start() {
	if (cm.getPlayer().itemQuantity(4033125)) {
		cm.getClient().getSession().write(Packages.tools.packet.CWvsContext.serverNotice(5, "I got the Dirty Old Diary. I don't have anymore business here."));
		cm.dispose();
		return;
		}
	if (cm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.ETC).getNumFreeSlot() < 1) {
		cm.getClient().getSession().write(Packages.tools.packet.CWvsContext.serverNotice(5, "You cannot take the Dirty Old Diary because your Etc tab is full."));
		cm.dispose();
		return;
		}
		cm.gainItem(4033125, 1);
		cm.dispose();
}