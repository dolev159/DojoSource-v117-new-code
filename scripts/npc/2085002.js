/*
	名字:	天空之門
	地圖:	天空的巢穴
	描述:	240080500
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
		if (status < 1) {
		cm.sendNext("Canceled.");
		cm.dispose();
		return;
		}
		status--;
		break;
	case 1:
		status++;
		break;
		}
		reactor = 'action' + (cm.getPlayer().getMap().getReactorById(2408005).getState() < 1 || cm.getPlayer().getMap().getMonsterById(8300007) != null ? 0 : 1);
		eval(reactor)(mode, type, selection);
}

function action0(mode, type, selection) {
	switch (status) {
	case 0:
		cm.sendYesNo("Would you like to forfeit the battle against the Dragon Rider and leave?");
		break;
	case 1:
		cm.sendNext("You have left Crimson Sky and are now on your way to the Crimson Sky Dock.");
		break;
	case 2:
		cm.getPlayer().changeMap(cm.getMap(240080000), cm.getMap(240080000).getPortal(0));
		cm.dispose();
}
}

function action1(mode, type, selection) {
	reactor = 'action' + (cm.getPlayer().getEventInstance().getProperty(cm.getPlayer().getName()) == null ? 2 : 3);
	eval(reactor)(mode, type, selection);
}

function action2(mode, type, selection) {
	switch (status) {
	case 0:
		cm.sendNextS("Huh? I think l hear something.", 3);
		break;
	case 1:
		cm.sendNextPrevS("That Dragon Rider. He's been alive all this time.", 3);
		break;
	case 2:
		cm.getPlayer().getEventInstance().setProperty(cm.getPlayer().getName(), 0);
		cm.dispose();
}
}

function action3(mode, type, selection) {
	switch (status) {
	case 0:
		cm.sendYesNo("Would you like to return to the Crimson Sky Dock?");
		break;
	case 1:
		if (cm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.USE).getNumFreeSlot() < 1) {
			cm.sendOk("You cannot receive your reward because there is not enough space in the Use tab of your Inventory. Please make space and try again.");
			cm.dispose();
			return;
			}
			cm.gainItem(2022651 + cm.getPlayer().getJob() / 100 % 10, 1);
			cm.getPlayer().changeMap(cm.getMap(240080000), cm.getMap(240080000).getPortal(0));
			cm.dispose();
}
}