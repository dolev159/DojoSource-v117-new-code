/*
	名字:	梅迪沙
	地圖:	阿斯旺避難所
	描述:	262000000
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
	switch (status) {
	case 0:
		cm.sendSimple("#e<Fight for Azwan>#n \r\n\r\nWould you like to join the Fight for Azwan? \r\n\r\n#L0##bChallenge Hilla. (Lv. 120+)#l\r\n#L1#Join the Fight for Azwan.");
		break;
	default:
		if (status == 1 && type == 5) select = selection;
		reactor = 'action' + select;
		eval(reactor)(mode, type, selection);
}
}

function action0(mode, type, selection) {
	switch (status) {
	case 1:
		if (cm.getPlayer().getLevel() < 120) {
			cm.sendOk("Hilla might be too strong for you. Come back when you're level 120 or higher.");
			cm.dispose();
			return;
			}
			cm.sendNext("I'll send you to Hilla tower. Do your best to come back im one piece.");
			break;
	case 2:
		cm.dispose();
		cm.getPlayer().changeMap(cm.getMap(262030000), cm.getMap(262030000).getPortal(3));
}
}

function action1(mode, type, selection) {
	switch (status) {
	case 1:
		cm.sendNextS("Honor EXP can only be obtained from battles between 2pm and 8pm. \r\n\r\n#b#eContents can be accessed even when the Fight for Azwan is not running.", 4);
		break;
	case 2:
		if (cm.getPlayer().getParty() != null && cm.getPlayer().getParty().getLeader().getId() != cm.getPlayer().getId()) {
			cm.getClient().getSession().write(Packages.tools.packet.CWvsContext.serverNotice(1, "Only available for party leaders."));
			cm.dispose();
			return;
			}
			cm.dispose();
			cm.getPlayer().changeMap(cm.getMap(262000300), cm.getMap(262000300).getPortal(1));
}
}