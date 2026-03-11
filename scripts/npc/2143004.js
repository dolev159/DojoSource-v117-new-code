/*
	名字:	另一個情報員
	地圖:	西格諾斯庭園
	描述:	271040000
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
		reactor = 'action' + (cm.getPlayer().getMap().getId() == 271040000 ? 0 : cm.getPlayer().getMap().getAllMonstersThreadsafe().size() > 0 ? 1 : 2);
		eval(reactor)(mode, type, selection);
}

function action0(mode, type, selection) {
	switch (status) {
	case 0:
		cm.sendSimple("#e<Cygnus Expedition>#n \r\nAre you ready to fight Cygnus? \r\n\r\n#L0##bRequest to join a Cygnus Expedition.");
		break;
	case 1:
		if (cm.getPlayer().getParty() == null || cm.getPlayer().getParty().getLeader().getId() != cm.getPlayer().getId()) {
			cm.sendOk("Only party leaders can initiate entry.");
			cm.dispose();
			return;
			}
			for (var i = 0; i < cm.getPlayer().getParty().getMembers().size(); i++)
		if (cm.getPlayer().getParty().getMembers().get(i).getMapid() != 271040000) {
			cm.sendNext("All party members must be on the same map to enter.");
			cm.dispose();
			return;
			}
			var em = cm.getEventManager("CygnusBattle");
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
		cm.sendYesNo("Would you like to finish the battle and leave?");
		break;
	case 1:
		cm.getPlayer().changeMap(cm.getMap(271040200), cm.getMap(271040200).getPortal(0));
		cm.dispose();
}
}

function action2(mode, type, selection) {
	switch (status) {
	case 0:
		cm.sendYesNo("When the fight is over, would you like to go to the Cygnus Rear Garden?");
		break;
	case 1:
		cm.getPlayer().changeMap(cm.getMap(271040210), cm.getMap(271040210).getPortal(0));
		cm.dispose();
}
}