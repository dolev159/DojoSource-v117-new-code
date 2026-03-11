/*
	名字:	利拉
	地圖:	火山的氣息&amp;lt;第2階段&gt;
	描述:	280020001
*/

var status;

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	switch (mode) {
	case -1:
		cm.dispose();
		return;
	case 0:
		status--;
		break;
	case 1:
		status++;
		break;
		}
	switch (status) {
	case 0:
		cm.sendNext("How did you go through-such treacherous road to get here?? Incredible! #bThe Breath of Lava#k is here. Please give this to my brother. You'll finally be meeting up with the one you've been looking for, very soon.");
		break;
	case 1:
		if (cm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.ETC).getNumFreeSlot() > 0) {
			cm.gainExp(15000);
			cm.gainItem(4031062, 1);
			cm.getPlayer().changeMap(cm.getMap(211042300), cm.getMap(211042300).getPortal(0));
			cm.dispose();
			return;
			}
			cm.sendNextPrev("Your etc, inventory seems to be full. Please make room in order to receive the item.");
			break;
	case 2:
		cm.dispose();
}
}