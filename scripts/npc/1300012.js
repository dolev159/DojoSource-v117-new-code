/*
	名字:	東邊城塔門
	地圖:	東邊城塔
	描述:	106021400
*/

function start() {
	cm.sendSimple("You will be moved to the #bEntrance to Wedding Hall#k. Where would you like to go?\r\n\r\n#L0##b1. Bringing Dowo King Pepe (Party : 1-6 / Level : 30 or higher)#l\r\n#L1#2. Saving Violetta (Solo only / Level : 30 or higher)#l");
}

function action(mode,type,selection) {
	switch(selection) {
	case 0:
		if (cm.getPlayer().getParty() == null || cm.getPlayer().getParty().getLeader().getId() != cm.getPlayer().getId()) {
			cm.sendNext("Only a party leader can make a request to enter.");
			cm.dispose();
			return;
			}
			var em = cm.getEventManager("KingPepeAndYetis");
			var prop = em.getProperty("state");
		if (prop == null || prop == 0) {
			em.startInstance(cm.getPlayer().getParty(), cm.getPlayer().getMap(), 200);
			cm.dispose();
			return;
			}
			cm.sendNext("Another party is already inside.");
			cm.dispose();
			break;
	case 1:
		if (cm.getPlayer().itemQuantity(4032388)) {
			cm.getPlayer().changeMap(cm.getMap(106021401), cm.getMap(106021401).getPortal(1));
			cm.dispose();
			return;
			}
			cm.sendNextS("To rescue #bPrincess #p1300002##k, you must find the #b#t4032388##k first. #b#p1300001##k probably has the Key! Rescue your party members first and defeat the #b#p1300001##k together.", 2);
			}
			cm.dispose();
}