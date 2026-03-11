/*
	名字:	卡普利爾的背包
	地圖:	戒備深嚴的住宅
	描述:	931010010
*/

function start() {
	if (cm.getPlayer().itemQuantity(4032757)) {
		cm.sendNext("#b(You've already grabbed the clothes you need. There's no need to try to grab more.)");
		cm.dispose();
		return;
		}
	if (cm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.ETC).getNumFreeSlot() < 1) {
		cm.sendNext("You can't take Gabrielle's clothes because you are holding too many things. Try again after making at least one free slot in the Etc of your inventory.");
		cm.dispose();
		return;
		}
		cm.sendOk("#b(You've grabbed Gabrielle's clothes. Deliver them quickly to Albert.)");
		cm.gainItem(4032757, 1);
		cm.dispose();
}