/*
	名字:	武英
	地圖:	神殿底層
	描述:	105100100
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
		if (cm.getPlayer().getLevel() < 65) {
			cm.sendOk("The Balrog imprisoned here is incredibly dangerous. Only a fearsome warrior can join the #e<Boss: Balrog>#n expedition. \r\nYou must be above Lv. 65 to join.");
			cm.dispose();
			return;
			}
			cm.sendSimple("#e<Boss: Balrog>#n \r\nThe Balrog is locked up over yonder. It is a lord of darkness that was sealed by Master Manji and the hero Tristan a long time ago. But since it recently began to gain back its power, the seal has grown unstable. It needs to be reinforced as quickly as possible... \r\n(All Channels / Lv. 65 and above / 1 - 6 players) \r\n\r\n#L0##bRequest to enter <Boss: Balrog>.");
			break;
	case 1:
		if (cm.getPlayer().getParty() == null || cm.getPlayer().getParty().getLeader().getId() != cm.getPlayer().getId()) {
			cm.sendOk("Only party leaders can initiate entry.");
			cm.dispose();
			return;
			}
			for (var i = 0; i < cm.getPlayer().getParty().getMembers().size(); i++)
		if (cm.getPlayer().getParty().getMembers().get(i).getMapid() != 105100100) {
			cm.sendNext("All party members must be on the same map to enter.");
			cm.dispose();
			return;
			}
			for (var i = 0; i < cm.getPlayer().getParty().getMembers().size(); i++)
		if (cm.getPlayer().getParty().getMembers().get(i).getLevel() < 65) {
			cm.sendOk("Party members must be at least Lv. 65.");
			cm.dispose();
			return;
			}
			var em = cm.getEventManager("BossBalrog_EASY");
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