/*
	名字:	皮耶魯先生
	地圖:	時間塔
	描述:	220080000
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
		cm.sendSimple("#e<Boss: Populatus>#n \r\nThat Troublemaker Papulatus keeps causing all kinds of dimensional cracks. He must be stopped! Can you help? \r\n\r\n#L0#Easy Mode (Level 115 and above)");
		break;
	case 1:
		if (cm.getPlayer().getParty() == null || cm.getPlayer().getParty().getLeader().getId() != cm.getPlayer().getId()) {
			cm.sendOk("Only party leaders can initiate entry.");
			cm.dispose();
			return;
			}
		if (cm.getPlayer().itemQuantity(4031179) < 1) {
			cm.sendOk("You don't have the item needed to meet Papulatus. I'll give you what I happened to have on me. \r\n\r\n#e<Required Items>#n #v4031179# Piece of Cracked Dimension");
			cm.dispose();
			return;
			}
			for (var i = 0; i < cm.getPlayer().getParty().getMembers().size(); i++)
		if (cm.getPlayer().getParty().getMembers().get(i).getLevel() < 115) {
			cm.sendOk("All party members must be at least level 115.");
			cm.dispose();
			return;
			}
			var em = cm.getEventManager("Populatus");
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