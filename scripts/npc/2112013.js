/*
	名字:	調查結果
	地圖:	可疑的研究室
	描述:	926110000
*/

var array = [5, 4, 3, 3, 3, 3, 3, 3, 3, 3, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1];

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
		cm.dispose();
		return;
		}
		status--;
		break;
	case 1:
		status++;
		break;
		}
		reactor = 'action' + cm.getPlayer().getMap().getId();
		eval(reactor)(mode, type, selection);
}

function action926110000(mode, type, selection) {
	switch (status) {
	case 0:
		eim = cm.getPlayer().getEventInstance();
		if (eim.getProperty("ch") == null) {
			for (var i = array.length - 1; i > 0; i--) {
			var j = Math.floor(Math.random() * (i + 1));
			var temp = array[i];
			array[i] = array[j];
			array[j] = temp;
			}
			var returnString = "";
			for (var i = 0; i < array.length; i++)
			returnString += array[i];
			eim.setProperty("ch", returnString);
			}
		if (Math.abs(cm.getPlayer().getPosition().x - cm.getNpcob().getPosition().x) > 100  || Math.abs(cm.getPlayer().getPosition().y - cm.getNpcob().getPosition().y) > 100) {
			cm.sendNext("It's located way too far to be thoroughly checked out.");
			cm.dispose();
			return;
			}
			slot = cm.getNpcob().getObjectId() % 26;
			chen = eim.getProperty("ch");
			hui = chen[slot];
		if (hui == '0') {
			cm.sendNext("This place has already been previously checked out.");
			cm.dispose();
			return;
			}
		if (hui == '1') {
			cm.sendNext("Unable to find anything inside.");
			eim.setProperty("ch", chen.substr(0, slot) + '0' + chen.substr(slot + 1));
			cm.dispose();
			return;
			}
		if (hui == '2') {
			cm.gainMeso(500);
			cm.sendNext("Found 500 mesos!");
			eim.setProperty("ch", chen.substr(0, slot) + '0' + chen.substr(slot + 1));
			cm.dispose();
			return;
			}
		if (hui == '3') {
			cm.sendNext("Earned 500 EXP.");
			cm.gainExp(500);
			eim.setProperty("ch", chen.substr(0, slot) + '0' + chen.substr(slot + 1));
			cm.dispose();
			return;
			}
		if (hui == '4') {
			if (cm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.ETC).getNumFreeSlot() < 1) {
			cm.sendNext("Unable to receive #bRomeo's Letter#k due to lack of space in the inventory.");
			cm.dispose();
			return;
			}
			cm.gainItem(4001130, 1);
			cm.sendNext("I found a letter that Romeo dropped.");
			eim.setProperty("ch", chen.substr(0, slot) + '0' + chen.substr(slot + 1));
			cm.dispose();
			return;
			}
			cm.sendSimple("This is one suspicious-looking switch. \r\n#L0##bPress the switch.#l\r\n#L1#Leave it as it is.#l");
			break;
	case 1:
		if (selection > 0) {
			cm.sendNext("The switch is left as it is.");
			cm.dispose();
			return;
			}
			cm.getPlayer().getMap().getReactorByName("d00").forceHitReactor(1);
			eim.setProperty("ch", chen.substr(0, slot) + '0' + chen.substr(slot + 1));
			cm.getPlayer().getMap().broadcastMessage(Packages.tools.packet.CField.environmentChange("quest/party/clear", 3));
			cm.getPlayer().getMap().broadcastMessage(Packages.tools.packet.CField.environmentChange("Party1/Clear", 4));
			cm.getPlayer().getMap().broadcastMessage(Packages.tools.packet.CWvsContext.serverNotice(6, cm.getPlayer().getName() + " pressed the switch, and a special portal appeared."));
			cm.dispose();
}
}

function action926110203(mode, type, selection) {
	switch (status) {
	case 0:
		if (Math.abs(cm.getPlayer().getPosition().x - cm.getNpcob().getPosition().x) > 100  || Math.abs(cm.getPlayer().getPosition().y - cm.getNpcob().getPosition().y) > 100) {
			cm.sendNext("It's located way too far to be thoroughly checked out.");
			cm.dispose();
			return;
			}
		if (cm.getNpcob().getPosition().x != 200) {
			cm.sendNext("Unable to find anything inside.");
			cm.dispose();
			return;
			}
		if (cm.getPlayer().getMap().getReactorByName("jnr6_out").getState() > 0) {
			cm.sendNext("This place has already been previously checked out.");
			cm.dispose();
			return;
			}
			cm.sendSimple("This is one suspicious-looking switch. \r\n#L0##bPress the switch.#l");
			break;
	case 1:
		cm.getPlayer().getMap().broadcastMessage(Packages.tools.packet.CWvsContext.serverNotice(6, cm.getPlayer().getName() + " pressing the switch, a hidden portal emerged."));
		cm.getPlayer().getMap().broadcastMessage(Packages.tools.packet.CField.environmentChange("quest/party/clear", 3));
		cm.getPlayer().getMap().broadcastMessage(Packages.tools.packet.CField.environmentChange("Party1/Clear", 4));
		cm.getPlayer().getMap().getReactorByName("jnr6_out").forceHitReactor(1);
		cm.dispose();
}
}