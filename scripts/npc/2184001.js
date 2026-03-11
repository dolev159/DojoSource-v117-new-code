/*
	名字:	梅迪沙
	地圖:	走廊1
	描述:	262030100
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
		if ((cm.getPlayer().getMap().getId() / 100) % 10 < 3) {
		cm.sendOkS("Please defeat Hilla and save Azwan.", 4);
		cm.dispose();
		return;
		}
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
		reactor = 'action' + ((cm.getPlayer().getMap().getId() / 100) % 10 < 3 ? 0 : 1);
		eval(reactor)(mode, type, selection);
}

function action0(mode, type, selection) {
	switch (status) {
	case 0:
		cm.sendYesNoS("Really give up?", 4);
		break;
	case 1:
		cm.sendNextS("I see. Well, thank you for all your help up to this point.", 4);
		break;
	case 2:
		cm.dispose();
		cm.getPlayer().changeMap(cm.getMap(262030000), cm.getMap(262030000).getPortal(0));
}
}

function action1(mode, type, selection) {
	switch (status) {
	case 0:
		cm.sendYesNoS("Would you like to finish the challenge and leave?", 4);
		break;
	case 1:
		if (cm.getPlayer().getMap().getMonsterById(cm.getPlayer().getMap().getId() == 262030300 ? 8870000 : 8870100) == null) {
			cm.getPlayer().changeMap(cm.getMap(262030000), cm.getMap(262030000).getPortal(0));
			cm.dispose();
			return;
			}
			cm.sendYesNoS("Are you really going to leave us to suffer under Hilla's torment?!", 4);
			break;
	case 2:
		cm.dispose();
		cm.getPlayer().changeMap(cm.getMap(262030000), cm.getMap(262030000).getPortal(0));
}
}