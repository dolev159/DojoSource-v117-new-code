/*
	名字:	邱翁
	地圖:	前往海盜船之路
	描述:	925100000
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
		cm.sendNext("Please think again carefully, and then talk to me.");
		cm.dispose();
		return;
		}
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
		reactor = 'action' + cm.getPlayer().getMap().getId() / 100 % 10;
		eval(reactor)(mode, type, selection);
}

function action0(mode, type, selection) {
	switch (status) {
	case 0:
		cm.sendSimple("What do you wish to do? \r\n#L2##bListen to Guon's story.#l\r\n#L9#Get off the pirate ship.#l");
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
		cm.sendNext("I'm Guon, the servant of the king of bellflowers, Wu Yang. Did you see the bellflowers at the herb field? They have collectively turned into violent monsters and are attacking people at will. You must know that we, the bellflowers, are not responsible for this. It's all because of #bLord Pirate#k!");
		break;
	case 2:
		cm.sendNextPrev("#bLord Pirate#k kidnapped the king of bellflowers, #b#p2094001##k, and has been ruthlessly controlling us ever since. We the bellflowers have no other choice but to follow his order, for we do not wish to risk the life of #b#p2094001##k.");
		break;
	case 3:
		cm.sendNextPrev("I would like nothing more than for you to rescue #b#p2094001##k from the evil hands of #bLord Pirate#k. That would be the only way we, the bellflowers, can regain peace. Please be aware that the pirate ship that carries both Lord Pirate and Wu Yang is ready to leave any minute. I strongly advise you board the ship that's located at the tail end of the East!");
		break;
	case 4:
		cm.dispose();
}
}

function action1(mode, type, selection) {
	reactor = 'action' + (eim.getProperty("stage1a") == null ? 8 : 5);
	eval(reactor)(mode, type, selection);
}

function action8(mode, type, selection) {
	switch (status) {
	case 0:
		cm.sendSimple("What do you wish to do? \r\n#L3##bGet on with the quest.#l\r\n#L9#Get off the pirate ship.#l");
		break;
	default:
		if (status == 1 && type == 5) select = selection;
		reactor = 'action' + select;
		eval(reactor)(mode, type, selection);
}
}

function action3(mode, type, selection) {
	switch (status) {
	case 1:
		if (cm.getPlayer().getParty().getLeader().getId() != cm.getPlayer().getId()) {
			cm.sendOk("You are not the party leader. Could you ask your party leader to speak to me?");
			cm.dispose();
			return;
			}
			cm.sendNext("Watch out! You may see pirates popping up around here any minute now. Thanks to Lord Pirate sealing up the portal to the next stage 3 times, you cannot just walk past this area!");
			break;
	case 2:
		cm.sendNextPrev("To break the seal, you'll need to acquire the #bPirate Emblem#k, an item that identifies the carrier as a pirate. Place the emblem in front of the seal, and the seal will be automatically disarmed. Please defeat the pirates that appear and collect the emblems they drop. Once you have enough #bPirate emblems#k, hand them to me and l will break the seal for you.");
		break;
	case 3:
		cm.sendNextPrev("The pirates will be rushing out here soon. l want you to defeat them and obtain at least #b20 Mark of the Rookie Pirate emblems#k.");
		break;
	case 4:
		cm.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(9300114), new java.awt.Point(-144, 61));
		cm.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(9300114), new java.awt.Point(784, 70));
		cm.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(9300114), new java.awt.Point(73, 231));
		cm.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(9300114), new java.awt.Point(667, 228));

		cm.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(9300114), new java.awt.Point(42, -21));
		cm.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(9300114), new java.awt.Point(794, -80));
		cm.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(9300114), new java.awt.Point(206, 67));
		cm.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(9300114), new java.awt.Point(575, 82));
		cm.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(9300114), new java.awt.Point(667, 63));
		cm.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(9300114), new java.awt.Point(317, 227));
		cm.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(9300114), new java.awt.Point(-28, 221));
		cm.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(9300114), new java.awt.Point(1088, 224));

		cm.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(9300114), new java.awt.Point(901, -68));
		cm.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(9300114), new java.awt.Point(-6, 63));
		cm.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(9300114), new java.awt.Point(966, 63));
		cm.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(9300114), new java.awt.Point(415, 223));
		cm.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(9300114), new java.awt.Point(-208, 222));
		cm.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(9300114), new java.awt.Point(793, 226));

		cm.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(9300114), new java.awt.Point(125, 61));
		cm.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(9300114), new java.awt.Point(875, 64));
		cm.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(9300114), new java.awt.Point(525, 223));
		cm.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(9300114), new java.awt.Point(192, 229));
		cm.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(9300114), new java.awt.Point(998, 230));

		eim.setProperty("stage1a", 0);
		cm.dispose();
}
}

function action4(mode, type, selection) {
	switch (status) {
	case 0:
		cm.sendSimple("What do you wish to do? \r\n#L6##bGet on with the quest.#l\r\n#L9#Get off the pirate ship.#l");
		break;
	default:
		if (status == 1 && type == 5) select = selection;
		reactor = 'action' + select;
		eval(reactor)(mode, type, selection);
}
}

function action6(mode, type, selection) {
	switch (status) {
	case 1:
		cm.sendNext("All the pirates are now aware that you are on their ship. Everyone is ready to attack you, even the ones not appointed to fight. This will be a never-ending flow of pirates, so I suggest you close the door where the pirates are coming from.");
		break;
	case 2:
		cm.sendNextPrev("The #bOld Metal Key#k needed to close the door is probably with the pirates right now. Defeat them and close the door of the ship!");
		break;
	case 3:
		cm.dispose();
}
}

function action5(mode, type, selection) {
	switch (status) {
	case 0:
		cm.sendYesNo("Would you like to discontinue this quest and leave the area?");
		break;
	case 1:
		cm.getPlayer().changeMap(cm.getMap(925100700), cm.getMap(925100700).getPortal(0));
		cm.dispose();
}
}

function action7(mode, type, selection) {
	switch (status) {
	case 0:
		cm.getPlayer().changeMap(cm.getMap(251010404), cm.getMap(251010404).getPortal(0));
		cm.getPlayer().removeAll(4001117);
		cm.dispose();
}
}

function action9(mode, type, selection) {
	switch (status) {
	case 1:
		cm.sendYesNo("Would you like to discontinue this quest and leave the area?");
		break;
	case 2:
		cm.getPlayer().changeMap(cm.getMap(925100700), cm.getMap(925100700).getPortal(0));
		cm.dispose();
}
}