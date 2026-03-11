/*
	名字:	戰爭神像
	地圖:	大師議會大廳
	描述:	610030600
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
		reactor = 'action' + cm.getPlayer().getMap().getReactorByName("mob1").getState();
		eval(reactor)(mode, type, selection);
}

function action0(mode, type, selection) {
	switch (status) {
	case 0:
		cm.sendNext("You and your friends have arrived in the sacred Grandmaster Councll Hall... yet you do not feel welcomed. A chill comes over your body. An evil cackle rings in your ears. You hear a strange type of language, sounds threatening. And then...nothing.");
		break;
	case 1:
		cm.sendSimple("Fools! You continue to fight for Masteria? \r\n\r\n#L0##bYes#l\r\n#L1#No#l");
		break;
	case 2:
		if (selection < 1) {
			cm.getPlayer().getMap().getReactorByName("mob1").forceHitReactor(1);
			cm.getPlayer().getMap().broadcastMessage(Packages.tools.packet.CWvsContext.serverNotice(6, "Prepare for battle!"));

			for (var i = 0; i < 15; i++)
			cm.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(9400594), new java.awt.Point(-872 + (Math.random() * 2000), 276));

			for (var i = 0; i < 15; i++)
			cm.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(9400582), new java.awt.Point(-872 + (Math.random() * 2000), 276));
			}
			cm.dispose();
}
}

function action1(mode, type, selection) {
	switch (status) {
	case 0:
		if (cm.getPlayer().getMap().getAllMonstersThreadsafe().size() > 0) {
			cm.dispose();
			return;
			}
			cm.sendNext("Beginner's Luck. Take this!");
			break;
	case 1:
		cm.sendSimple("Will yoo defy us, the Twisted Masters, once more? \r\n\r\n#L0##bYes#l\r\n#L1#No#l");
		break;
	case 2:
		if (selection < 1) {
			cm.getPlayer().getMap().getReactorByName("mob1").forceHitReactor(2);
			cm.getPlayer().getMap().broadcastMessage(Packages.tools.packet.CWvsContext.serverNotice(6, "Prepare for Glory!"));

			cm.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(9400589), new java.awt.Point(-391, 276));
			cm.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(9400590), new java.awt.Point(-291, 276));
			cm.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(9400591), new java.awt.Point(-117, 276));
			cm.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(9400592), new java.awt.Point(75, 276));
			cm.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(9400593), new java.awt.Point(233, 276));
			}
			cm.dispose();
}
}

function action2(mode, type, selection) {
	switch (status) {
	case 0:
		if (cm.getPlayer().getMap().getAllMonstersThreadsafe().size() > 0) {
			cm.dispose();
			return;
			}
			cm.sendOk("Yes... quite disturbing. Sugar-Coated Olives, Swiss Cheese...It looks like my theory was right--the Twisted Masters were from Versal.");
			break;
	case 1:
		cm.dispose();
}
}