/*
	名字:	艾爾多魯
	地圖:	夢幻公園入口
	描述:	551030100
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
		cm.sendSimple("#e<Expedition>#n \r\nScarlion and Targa have gone wild and are now demolishing the Fantasy Theme Park. If nobody stops them we will have to close our beioved park. \r\n\r\n#L0##bRequest to join the Expedition#l");
		break;
	case 1:
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
		if (cm.getPlayer().getParty().getMembers().get(i).getMapid() != 551030100) {
			cm.sendNext("All party members must be on the same map to enter.");
			cm.dispose();
			return;
			}
		if (cm.getPlayer().itemQuantity(4032246) < 1) {
			cm.sendOk("You don't have the item needed to meet Scarlion and Targa.");
			cm.dispose();
			return;
			}
			var em = cm.getEventManager("ScarTarBattle");
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