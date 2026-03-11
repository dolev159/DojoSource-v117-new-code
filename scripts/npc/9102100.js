/*
	名字:	寵物訓練1
	地圖:	寵物公園
	描述:	100000202
*/

function start() {
	if (cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(4646)).getStatus() != 1) {
		cm.sendOk("#b(I couldn't find anything.)");
		cm.dispose();
		return;
		}
	if (cm.getPlayer().itemQuantity(4031921)) {
		cm.sendNext("#b(What's this... eww... a pet's poop was in there!)");
		cm.dispose();
		return;
		}
		cm.sendYesNo("#b(I can see something covered in grass. Should I pull it out?)");
}

function action(mode, type, selection) {
	switch (mode) {
	case 0:
		cm.sendNext("#b(I didn't touch this hidden item covered in grass)");
		break;
	case 1:
		if (cm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.ETC).getNumFreeSlot() < 1) {
			cm.getClient().getSession().write(Packages.tools.packet.CWvsContext.serverNotice(1, "Etc item inventory is full."));
			cm.dispose();
			return;
			}
			cm.sendNext("I found the item that Pet Trainer Bartos hid...this note.");
			cm.gainItem(4031921, 1);
			}
			cm.dispose();
}