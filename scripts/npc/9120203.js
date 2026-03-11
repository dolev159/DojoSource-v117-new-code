/*
	名字:	鈴木
	地圖:	基地內部(最終之地)
	描述:	801040101
*/

var prize = true;

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
		cm.sendOk("I'm in awe of your resilience. Well, talk to me again if you want to return to Showa Town.");
		cm.dispose();
		return;
		}
		status--;
		break;
	case 1:
		status++;
		break;
		}
		reactor = 'action' + (cm.getPlayer().itemQuantity(4000141) || !prize ? 0 : 1);
		eval(reactor)(mode, type, selection);
}

function action0(mode, type, selection) {
	switch (status) {
	case 0:
		cm.sendNext("Wow, you really did it. Thinking about his singular obsession with controlling Showa Town, I still get the creeps. I like to think this means things in town will finally be quiet, but I've got a knot in my stomach that says otherwise. Anyways, for now let's celebrate the fact that the boss is gone.");
		break;
	case 1:
		if (prize) {
		if (cm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.USE).getNumFreeSlot() < 1) {
			cm.sendOk("Make sure you have a free slot in your Use tab.");
			cm.dispose();
			return;
			}
			prize = false;
			cm.gainItem(4000141, -1);
			cm.gainItem(2000004, 50);
			}
			cm.sendNextPrev("Well, cheers.");
			break;
	case 2:
		cm.sendYesNo("All right, do you want to go back to Showa Town?");
		break;
	case 3:
		cm.getPlayer().changeMap(cm.getMap(801000000), cm.getMap(801000000).getPortal(0));
		cm.dispose();
}
}

function action1(mode, type, selection) {
	switch (status) {
	case 0:
		cm.sendNext("Wow, you really did it. Thinking about his singular obsession with controlling Showa Town, I still get the creeps. I like to think this means things in town will finally be quiet, but I've got a knot in my stomach that says otherwise. Anyways, for now let's celebrate the fact that the boss is gone.");
		break;
	case 1:
		cm.sendYesNo("All right, do you want to go back to Showa Town?");
		break;
	case 2:
		cm.getPlayer().changeMap(cm.getMap(801000000), cm.getMap(801000000).getPortal(0));
		cm.dispose();
}
}