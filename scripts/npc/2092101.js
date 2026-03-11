/*
	名字:	奇翁
	地圖:	海盜的寶物倉庫
	描述:	925110000
*/

function start() {
	if (cm.getPlayer().getMap().getAllMonstersThreadsafe().size() > 0) {
		cm.dispose();
		return;
		}
	if (cm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.ETC).getNumFreeSlot() < 1) {
		cm.sendNext("You're going to have to drop some of those things your're holding in your hands if you want to rescue me. You look like you've got too much baggage.");
		cm.dispose();
		return;
		}
		cm.sendNext("Thank you for rescuing me. Let's hurry and get back to the town.");
}

function action(mode, type, selection) {
	if (mode > 0) {
		cm.gainItem(4032497, cm.getPlayer().itemQuantity(4032497) ? 0 : 1);
		cm.getPlayer().changeMap(cm.getMap(251000000), cm.getMap(251000000).getPortal(0));
		}
		cm.dispose();
}