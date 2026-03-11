/*
	名字:	異界的祭壇石像
	地圖:	阿卡伊農的祭壇前
	描述:	272020110
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
		status--;
		break;
	case 1:
		status++;
		break;
		}
		reactor = 'action' + (cm.getPlayer().getMap().getId() == 272020110 ? 0 : 1);
		eval(reactor)(mode, type, selection);
}

function action0(mode, type, selection) {
	switch (status) {
	case 0:
		if (cm.getPlayer().getParty() == null) {
			cm.sendOk("You must be in a party to enter.");
			cm.dispose();
			return;
			}
			cm.sendSimple("#e<Boss: Arkarium>#n \r\nWarriors! Are you ready to battle the Black Mage's evil commander? \r\n\r\n#L0##bRequest to enter <Boss: Arkarium>.");
			break;
	case 1:
		if (cm.getPlayer().getParty().getLeader().getId() != cm.getPlayer().getId()) {
			cm.sendOk("Only party leaders can initiate entry.");
			cm.dispose();
			return;
			}
			for (var i = 0; i < cm.getPlayer().getParty().getMembers().size(); i++)
		if (cm.getPlayer().getParty().getMembers().get(i).getMapid() != 272020110) {
			cm.sendNext("All party members must be on the same map to enter.");
			cm.dispose();
			return;
			}
			var em = cm.getEventManager("ArkariumBattle");
			var prop = em.getProperty("state");
		if (prop == null || prop == 0) {
			em.startInstance(cm.getPlayer().getParty(), cm.getPlayer().getMap(), 200);
			cm.dispose();
			return;
			}
			cm.sendNext("Another party is already inside.");
			cm.dispose();
}
}

function action1(mode, type, selection) {
	switch (status) {
	case 0:
		cm.sendYesNo("After the fight is over, would you like to exit Arkarium's Altar?");
		break;
	case 1:
		cm.getPlayer().changeMap(cm.getMap(272020110), cm.getMap(272020110).getPortal(0));
		cm.dispose();
}
}