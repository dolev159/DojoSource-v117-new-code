/*
	名字:	遠征隊的標識
	地圖:	闇黑龍王洞穴入口
	描述:	240050400
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
	switch (status) {
	case 0:
		cm.sendSimple("#e<Boss: Horntail>#n \r\nHorntail is back and he's angry! If we don't do anything, all of Minar Forest will become a towering inferno! \r\n#L0##bRequest to enter <Boss: Horntail>.#l");
		break;
	case 1:
		cm.sendSimple("#e<Boss: Horntail>#n \r\nSelect the mode you want. \r\n\r\n#L0#Normal Mode (Level 120 or above)#l\r\n#L1#Chaos Mode (Level 135 or above)#l");
		break;
	case 2:
		if (cm.getPlayer().getParty() == null || cm.getPlayer().getParty().getLeader().getId() != cm.getPlayer().getId()) {
			cm.sendOk("Only party leaders can initiate entry.");
			cm.dispose();
			return;
			}
			for (var i = 0; i < cm.getPlayer().getParty().getMembers().size(); i++)
		if (cm.getPlayer().getParty().getMembers().get(i).getMapid() != 240050400) {
			cm.sendNext("All party members must be on the same map to enter.");
			cm.dispose();
			return;
			}
			for (var i = 0; i < cm.getPlayer().getParty().getMembers().size(); i++)
		if (cm.getPlayer().getParty().getMembers().get(i).getLevel() < (selection < 1 ? 120 : 135)) {
			cm.sendOk("Party members must be at least Lv. " + (selection < 1 ? 120 : 135) + ".");
			cm.dispose();
			return;
			}
			var em = cm.getEventManager(selection < 1 ? "HorntailBattle" : "ChaosHorntail");
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