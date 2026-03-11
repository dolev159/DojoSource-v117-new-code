/*
	名字:	興兒
	地圖:	迎月花山丘
	描述:	910010000
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
		cm.sendSimple("Yum, yum! This is so tasty. Please bring me more #b#t4001101##k. " + (cm.getChannelServer().getEventSM().getEventManager("HenesysPQ").getProperty("state") == 2 ? "\r\n#L0#I want to give some #b#t4001101##k to Tory as well#l" : "") + "\r\n#L1#I want to leave this place.#l");
		break;
	case 1:
		if (selection < 1) {
			cm.getPlayer().getMap().setSpawns(true);
			cm.getPlayer().getMap().respawn(true);
			cm.getChannelServer().getEventSM().getEventManager("HenesysPQ").setProperty("state", 3);
			cm.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(9300061), new java.awt.Point(-183, -433));
			cm.dispose();
			return;
			}
			cm.sendNext("Please bring more #b#t4001101##k for me sometime! Good-bye for now.");
			break;
	case 2:
		cm.getPlayer().changeMap(cm.getMap(910010500), cm.getMap(910010500).getPortal(0));
		cm.dispose();
}
}