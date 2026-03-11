/*
	名字:	黑暗的祭壇石像
	地圖:	黑暗的祭壇 入口
	描述:	272030300
*/

function start() {
	cm.sendYesNo("This is the Foyer of Darkness. Will you enter?");
}

function action(mode, type, selection) {
	if (mode > 0) {
		if (cm.getPlayer().getParty() == null) {
			cm.sendOk("You may enter in a party.");
			cm.dispose();
			return;
			}
		if (cm.getPlayer().getParty().getLeader().getId() != cm.getPlayer().getId()) {
			cm.sendOk("The party leader must initiate entry.");
			cm.dispose();
			return;
			}
			var em = cm.getEventManager("ArkariumAK");
			var prop = em.getProperty("state");
		if (prop == null || prop == 0) {
			em.startInstance(cm.getPlayer().getParty(), cm.getPlayer().getMap(), 200);
			cm.dispose();
			return;
			}
			cm.sendNext("Another party is already inside.");
			}
			cm.dispose();
}