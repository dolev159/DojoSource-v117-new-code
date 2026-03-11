/*
	名字:	闇黑龍王的里程碑
	地圖:	洞穴入口
	描述:	240050000
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
		if (type == 2) {
		cm.sendNext("Think again and talk to me.");
		cm.dispose();
		return;
		}
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
		reactor = 'action' + (cm.getPlayer().getMap().getId() == 240050000 ? 0 : cm.getPlayer().getMap().getId() == 240050100 ? 1 : 2);
		eval(reactor)(mode, type, selection);
}

function action0(mode, type, selection) {
	switch (status) {
	case 0:
		cm.sendSimple("Don't you dare to step up to the cave of life... Only those who find a hidden key will come to me. Do you want to challenge this reckless game? \r\n#L0##bYes, I do#l");
		break;
	case 1:
		if (cm.getPlayer().getParty() == null) {
			cm.sendOk("Don't show your reckless valor, fool... Challenge with the stronger ones.");
			cm.dispose();
			return;
			}
		if (cm.getPlayer().getParty().getLeader().getId() != cm.getPlayer().getId()) {
			cm.sendOk("Are you the leader for this group of the foolish?");
			cm.dispose();
			return;
			}
			party = cm.getPlayer().getParty().getMembers();
			for (var i = 0; i < party.size(); i++)
		if (party.size() < 2) {
			cm.sendNext("Who do you think you are! You are too weak. Go back.");
			cm.dispose();
			return;
			}
			for (var i = 0; i < party.size(); i++)
		if (party.get(i).getMapid() != 240050000) {
			cm.sendNext("Don't show your reckless valor, fool... Challenge with the stronger ones.");
			cm.dispose();
			return;
			}
			var em = cm.getEventManager("HontalePQ");
			var prop = em.getProperty("state");
		if (prop == null || prop == 0) {
			em.startInstance(cm.getPlayer().getParty(), cm.getPlayer().getMap(), 200);
			cm.dispose();
			return;
			}
			cm.sendOk("Another party is already challenging it. They're just as fool as you are.");
			cm.dispose();
}
}

function action1(mode, type, selection) {
	switch (status) {
	case 0:
		if (cm.getPlayer().getParty().getLeader().getId() != cm.getPlayer().getId()) {
			cm.sendOk("Are you here on behalf of the foolish ones?");
			cm.dispose();
			return;
			}
		if (cm.getPlayer().itemQuantity(4001092) < 1) {
			cm.sendOk("Only those who have #t4001092# can enter the cave of choice.");
			cm.dispose();
			return;
			}
			cm.sendSimple("Do you want to use #r#t4001092##k and move to the cave of choice? \r\n#L0##bYes, I would like to move on.#l" );
			break;
	case 2:
		if (cm.getMap(240050101).getCharactersThreadsafe().size() > 0 || cm.getMap(240050102).getCharactersThreadsafe().size() > 0 || cm.getMap(240050103).getCharactersThreadsafe().size() > 0 || cm.getMap(240050104).getCharactersThreadsafe().size() > 0 || cm.getMap(240050105).getCharactersThreadsafe().size() > 0) {
			cm.sendOk("Isn't  there someone in the maze yet?");
			cm.dispose();
			return;
			}
			cm.gainItem(4001092, -1);
			cm.warpMap(240050200, 0);
			cm.dispose();
}
}

function action2(mode, type, selection) {
	reactor = 'action' + (cm.getPlayer().getParty().getLeader().getId() != cm.getPlayer().getId() ? 3 :  cm.getPlayer().getEventInstance().getProperty("key") == null ? 4 : 5);
	eval(reactor)(mode, type, selection);
}

function action3(mode, type, selection) {
	switch (status) {
	case 0:
		cm.sendOk("Are you the leader to this group of foolish?");
		break;
	case 1:
		cm.dispose();
}
}

function action4(mode, type, selection) {
	switch (status) {
	case 0:
		if (cm.getPlayer().itemQuantity(4001093) < 6) {
			cm.sendOk("Do you have six #b#t4001093##k?");
			cm.dispose();
			return;
			}
			cm.sendSimple("Do you want to leave this place using six #b#t4001093##k? \r\n#L0##bUse the blue key.#l");
			break;
	case 1:
		cm.sendNext("All devil spirits should be cleared to get out of here using the blue key. After eliminating all monsters, talk to me again.");
		cm.getPlayer().getEventInstance().setProperty("key", 1);
		cm.getPlayer().getMap().setSpawns(false);
		cm.gainItem(4001093, -6);
		cm.dispose();
}
}

function action5(mode, type, selection) {
	switch (status) {
	case 0:
		cm.sendSimple("Did you clear all monsters in this room? \r\n#L0##bAll cleared.#l");
		break;
	case 1:
		if (cm.getPlayer().getMap().getAllMonstersThreadsafe().size() > 0) {
			cm.sendOk("This room hasn't cleared yet.");
			cm.dispose();
			return;
			}
			cm.sendYesNo("Succeeded in purifying this room and collecting #b#t4001093##k. Do you want to move to Horntail's cave?");
			break;
	case 2:
		cm.warpMap(240050600, 0);
		cm.dispose();
}
}