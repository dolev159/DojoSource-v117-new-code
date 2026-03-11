/*
	名字:	鬥神的象徵交換機
	地圖:	戰鬥廣場
	描述:	960000000
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
		if (status < 2) {
		cm.dispose();
		return;
		}
		status--;
		break;
	case 1:
		status++;
		break;
		}
	switch (status) {
	case 0:
		cm.sendSimple("#r#eCrawson's BP Exchanger#n#k \r\nTrade in your BP for Gallant Emblems. \r\nYou currently have #b" + cm.getPlayer().getBattlePoints() + " BP#k. \r\n#L0# Dont Trade#l\r\n#L500##v4310015# #t4310015# x 1 (500BP)#l\r\n#L1500##v4310015# #t4310015# x 4 (1500BP)#l\r\n#L2500##v4310015# #t4310015# x 7 (2500BP)#l");
		break;
	case 1:
		if (selection < 1) {
			cm.dispose();
			return;
			}
		if (cm.getPlayer().getBattlePoints() < selection) {
			cm.sendNext("You've only got " + cm.getPlayer().getBattlePoints() + " BP. If you want " + (selection < 1500 ? 1 : selection < 2500 ? 4 : 7) + " Gallant Emblems, you have to have at least " + selection + " BP.");
			cm.dispose();
			return;
			}
		if (cm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.EQUIP).getNumFreeSlot() < 1) {
			cm.sendOk("It seems like you have no slots available in your Inventory. Could you check again?");
			cm.dispose();
			return;
			}
			cm.getPlayer().setBattlePoints(cm.getPlayer().getBattlePoints() - selection);
			cm.gainItem(4310015, selection < 1500 ? 1 : selection < 2500 ? 4 : 7);
			cm.dispose();
}
}