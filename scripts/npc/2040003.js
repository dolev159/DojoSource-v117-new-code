/*
	名字:	曾助教
	地圖:	玩具工廠&amp;lt;A工程1&gt;
	描述:	220020000
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
		cm.dispose();
		return;
		}
		if (status < 2) {
		cm.sendNext("That's the spirit! Not giving up once you start something is what's important! Now go investigate the plastic containers and bring me 10 #bMachine Parts#k items.");
		cm.dispose();
		return;
		}
		status--;
		break;
	case 1:
		status++;
		break;
		}
		reactor = 'action' + (cm.getPlayer().getMap().getId() == 220020000 ? 0 : 1);
		eval(reactor)(mode, type, selection);
}

function action0(mode, type, selection) {
	switch (status) {
	case 0:
		if (cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(3239)).getStatus() != 1) {
			cm.sendOk("Lately the mechanical parts have been missing at the Toy Factory, and that really concerns me. I want to ask for help, but you don't seem strong enough to help us out. Who should I ask...?");
			cm.dispose();
			return;
			}
			cm.sendNext("Okay, then. Inside this room, you'll see a whole lot of plastic barrels lying around. Strike the barrels to knock them down, and see if you can find the lost #bMachine Parts#k inside. You'll need to collect 10 #bMachine Parts#k and then talk to me afterwards. There's a time limit on this, so go!");
			break;
	case 1:
		if (cm.getMap(922000000).getCharacters().size() < 1) {
			cm.getMap(922000000).resetFully();
			cm.getPlayer().changeMap(cm.getMap(922000000), cm.getMap(922000000).getPortal(0));
			cm.getPlayer().startMapTimeLimitTask(1200, cm.getMap(220020000));
			cm.dispose();
			return;
			}
			cm.sendNextPrev("I'm sorry, but it seems like someone else is inside looking through the barrels. Only one person is allowed in here, so you'll have to wait for your turn.");
			break;
	case 2:
		cm.dispose();
}
}

function action1(mode, type, selection) {
	reactor = 'action' + (cm.getPlayer().itemQuantity(4031092) < 10 ? 2 : 3);
	eval(reactor)(mode, type, selection);
}

function action2(mode, type, selection) {
	switch (status) {
	case 0:
		cm.sendSimple("Have you taken care of everything? If you wish to leave, I'll let you out. Ready to go? \r\n\r\n#L0##bPlease let me out.");
		break;
	case 1:
		cm.sendYesNo("Hmm... All right. I can let you out, but you'll have to start from the beginning next time. Still wanna leave?");
		break;
	case 2:
		cm.getPlayer().changeMap(cm.getMap(922000009), cm.getMap(922000009).getPortal(0));
		cm.dispose();
}
}

function action3(mode, type, selection) {
	switch (status) {
	case 0:
		cm.sendNext("Oh ho, you really brought 10 Machine Parts items, and just in time. All right then! Since you have done so much for the toy factory, l'll give you a great present. Before I do that, however, make sure you have at least one empty slot in your Use tab.");
		break;
	case 1:
		if (qm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.USE).getNumFreeSlot() < 1) {
			cm.getClient().getSession().write(Packages.tools.packet.CWvsContext.serverNotice(1, "Use item inventory is full."));
			cm.dispose();
			return;
			}
			cm.dispose();
			cm.gainExp(140874);
			cm.gainItem(2040708, 1);
			cm.gainItem(4031092, -10);
			cm.getPlayer().changeMap(cm.getMap(220020000), cm.getMap(220020000).getPortal(0));
}
}