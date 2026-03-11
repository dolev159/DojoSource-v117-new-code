/*
	名字:	盧頓
	地圖:	第五座塔
	描述:	211061000
*/

var map = 211061100;
var num = 10;

var move = true;

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
		reactor = 'action' + (cm.getPlayer().getMap().getId() == 211061000 ? 0 : 1);
		eval(reactor)(mode, type, selection);
}

function action0(mode, type, selection) {
	switch (status) {
	case 0:
		if (cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(3178)).getStatus() < 2) {
			cm.sendOk("This is #b#m211061100##k, where the evil gatekeeper #r#o8210013##k lurks. I fear you are not yet ready to face him.");
			cm.dispose();
			return;
			}
			cm.sendSimple("#bAni's Jail#k is just ahead. What do you want to do? \r\n\r\n#L0##b1. Battle Prison Guard Ani#l");
			break;
	case 1:
		if (cm.getPlayer().getParty() != null) {
			cm.sendOk("You cannot enter as a party. Please disband your party to proceed.");
			cm.dispose();
			return;
			}
			cm.dispose();
			for (var i = 0; i < num; i++)
		if (cm.getMap(map + i).getCharacters().size() < 1 && move) {
			cm.getMap(map + i).resetFully();
			cm.getPlayer().changeMap(cm.getMap(map + i), cm.getMap(map + i).getPortal(0));
			cm.getPlayer().startMapTimeLimitTask(1800, cm.getMap(211061000));
			move = false;
}
}
}

function action1(mode, type, selection) {
	switch (status) {
	case 0:
		cm.sendYesNo("Would you like to leave Ani's Jail?");
		break;
	case 1:
		cm.dispose();
		cm.getPlayer().changeMap(cm.getMap(211061000), cm.getMap(211061000).getPortal(0));
}
}