/*
	名字:	雨揚
	地圖:	雨揚的感謝
	描述:	925100600
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
		eim = cm.getPlayer().getEventInstance();
		reactor = 'action' + (cm.getPlayer().getMap().getId() == 925100500 ? 0 : 1);
		eval(reactor)(mode, type, selection);
}

function action0(mode, type, selection) {
	switch (status) {
	case 0:
		cm.sendNext("Thank you so much for rescuing me. We'll now be able to escape the evil wrath of Lord Pirate that has threatened to demolish the bellflowers in town. We'll now send you outside. Please talk to me again once you're out.");
		break;
	case 1:
		cm.getPlayer().changeMap(cm.getMap(925100600), cm.getMap(925100600).getPortal(0));
		cm.dispose();
}
}

function action1(mode, type, selection) {
	switch (status) {
	case 0:
		cm.sendSimple("What do you wish to do? \r\n#L2##bReceived a Lord Pirate Hat Fragment.#l\r\n#L3#Leave this place.#l");
		break;
	default:
		if (status == 1 && type == 5) select = selection;
		reactor = 'action' + select;
		eval(reactor)(mode, type, selection);
}
}

function action2(mode, type, selection) {
	switch (status) {
	case 1:
		eim = cm.getPlayer().getEventInstance();
		num = eim.getProperty(cm.getPlayer().getName());
		if (num == -1) {
			cm.sendOk("You have already received a Hat Fragment.");
			cm.dispose();
			return;
			}
		if (num < 10) {
			cm.sendOk("You did not defeat the pirate enough times to receive a fragment. Please try harder.");
			cm.dispose();
			return;
			}
			cm.sendNext("You have defeated a total of " + num + " monsters. I will give you " + parseInt(num / 10) + " Lord Pirate Hat Fragment.");
			break;
	case 2:
		if (cm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.EQUIP).getNumFreeSlot() > 0) {
			eim.setProperty(cm.getPlayer().getName(), -1);
			cm.gainItem(4001455, parseInt(num / 10));
			cm.dispose();
			return;
			}
			cm.sendNextPrev("Your Inventory is full.Please make sure you have enoughroom in your ETC tabs.");
			break;
	case 3:
		cm.dispose();
}
}

function action3(mode, type, selection) {
	switch (status) {
	case 1:
		cm.getPlayer().changeMap(cm.getMap(925100700), cm.getMap(925100700).getPortal(0));
		cm.dispose();
}
}