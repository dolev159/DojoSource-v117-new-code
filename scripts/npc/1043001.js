/*
	名字:	草藥叢
	地圖:	第5階段
	描述:	910130102
*/

function start() {
	if (cm.getPlayer().getPosition().y > -2962) {
		cm.sendOk("You can't see the inside of the pile of flowers very well because you're too far. Go a little closer.");
		cm.dispose();
		return;
		}
	if (cm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.ETC).getNumFreeSlot() < 1) {
		cm.getClient().getSession().write(Packages.tools.packet.CWvsContext.serverNotice(1, "Etc item inventory is full."));
		cm.dispose();
		return;
		}
		cm.sendYesNo("Are you sure you want to take #b#t4031032##k with you?");
}

function action(mode, type, selection) {
	if (mode > 0) {
		cm.gainItem(4031032, 1);
		cm.getPlayer().changeMap(cm.getMap(101000000), cm.getMap(101000000).getPortal(0));
		}
		cm.dispose();
}