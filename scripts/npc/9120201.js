/*
	名字:	鈴木
	地圖:	武器庫
	描述:	801040004
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
		if (cm.getPlayer().getParty() == null) {
			cm.sendOk("You must be in a party of one or more to enter.");
			cm.dispose();
			return;
			}
		if (cm.getPlayer().getParty().getLeader().getId() != cm.getPlayer().getId()) {
			cm.sendOk("The party leader must initiate entry.");
			cm.dispose();
			return;
			}
			for (var i = 0; i < cm.getPlayer().getParty().getMembers().size(); i++)
		if (cm.getPlayer().getParty().getMembers().get(i).getMapid() != 801040004) {
			cm.sendNext("All party members must be on the same map to enter.");
			cm.dispose();
			return;
			}
		if (cm.getPlayer().itemQuantity(4000138) < 1) {
			cm.sendOk("So you made it all the way here... I'm impressed, kid! Beyond this point is the Big Boss. I honestly don't know if you can take him... But taking down the Yakuza Underboss would prove you've definitely got a shot. If you can defeat her and bring her comb as proof, I'll take you to the Yakuza Boss.");
			cm.dispose();
			return;
			}
			cm.sendSimple("#e<Boss: Yakuza Boss>#n \r\nHey! Is that the Yakuza Underboss's Comb in your hand?! I knew you could do it! Maybe you can take down the Big Boss. Will you be able to break into his inner sanctum? \r\n\r\n#L0##bEnter <Boss: Yakuza Boss>.");
			break;
	case 1:
		cm.sendSimple("#e<Boss: Yakuza Boss>#n \r\nPlease select the mode you want to challenge. \r\n\r\n#L0#Normal Mode (Lv.160 or higher)");
		break;
	case 2:
			var em = cm.getEventManager("ShowaBattle");
			var prop = em.getProperty("state");
		if (prop == null || prop == 0) {
			em.startInstance(cm.getPlayer().getParty(), cm.getPlayer().getMap(), 200);
			cm.dispose();
			return;
			}
			cm.sendOk("Another party is already inside.");
			cm.dispose();
}
}