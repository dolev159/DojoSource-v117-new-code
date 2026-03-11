/*
	名字:	蓝花簇
	地圖:	第4階段
	描述:	910530101
*/

function start() {
	if (cm.getPlayer().getPosition().y > -1755) {
		cm.sendOk("You can't see the inside of the pile of flowers very well because you're too far. Go a little closer.");
		cm.dispose();
		return;
		}
	if (cm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.ETC).getNumFreeSlot() < 1) {
		cm.getClient().getSession().write(Packages.tools.packet.CWvsContext.serverNotice(1, "Etc item inventory is full."));
		cm.dispose();
		return;
		}
		cm.gainItem(4031026, 20);
		cm.getPlayer().changeMap(cm.getMap(105000000), cm.getMap(105000000).getPortal(0)); //奇幻村
		cm.dispose();
}