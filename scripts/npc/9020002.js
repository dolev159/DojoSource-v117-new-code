/*
	名字:	娜拉
	地圖:	第一次同行&amp;lt;1號關隘&gt;
	描述:	910340100
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
		if (type == 2) {
		cm.sendNext("l see. Gather up the strength of your party members and try harder!");
		cm.dispose();
		return;
		}
		if (type == 5) {
		cm.dispose();
		return;
		}
		status--;
		break;
	case 1:
		status++;
		break;
		}
		reactor = 'action' + (cm.getPlayer().getMap().getId() % 1000 == 0 ? 2 : cm.getPlayer().getMap().getId() % 1000 == 300 ? 1 : 0);
		eval(reactor)(mode, type, selection);
}

function action0(mode, type, selection) {
	switch (status) {
	case 0:
		cm.sendYesNo("You'll have to start over from scratch if you want to take a crack at this quest after leaving this stage. Are you sure you want to leave this map?");
		break;
	case 1:
		cm.getPlayer().changeMap(cm.getMap(910340000), cm.getMap(910340000).getPortal(0));
		cm.dispose();
}
}

function action1(mode, type, selection) {
	switch (status) {
	case 0:
		cm.sendSimple("Do you need some help? \r\n#L0##bI need Platform Puppet.#l\r\n#L1#I want to get out of here.#l");
		break;
	case 1:
		if (selection < 1) {
			if (cm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.ETC).getNumFreeSlot() < 1) {
			cm.sendNext("I can't give you the #bPlatform Puppet#k, because you don't have any room in your Inventory. Please empty 1 slot in your #rEtc#k window.");
			cm.dispose();
			return;
			}
			cm.gainItem(4001454, 1);
			cm.sendNext("You have received a Platform Puppet. If you place it on the platform, it will have the same effect as someone standing there. Remember, though, this is an item that can only be used in here.");
			cm.dispose();
			return;
			}
			cm.getPlayer().changeMap(cm.getMap(910340000), cm.getMap(910340000).getPortal(0));
			cm.dispose();
}
}

function action2(mode, type, selection) {
	switch (status) {
	case 0:
		cm.getPlayer().changeMap(cm.getMap(910340700), cm.getMap(910340700).getPortal(0));
		cm.getPlayer().removeAll(4001007);
		cm.dispose();
}
}