/*
	名字:	競技場
	地圖:	進入競技場內部
	描述:	200101400
*/

function start() {
	cm.sendSimple("You are about to enter the danger zone! Xerxes is waiting inside. Are you ready to go in? \r\n\r\n#L0##bYes#l\r\n#L1#No#l \r\n\r\nRequirement: Lv. 50 or higher");
}

function action(mode,type,selection) {
	switch(selection) {
	case 0:
		if (cm.getPlayer().getParty() == null) {
			cm.sendNext("You must be in a party to enter.");
			cm.dispose();
			return;
			}
		if (cm.getPlayer().getParty().getLeader().getId() != cm.getPlayer().getId()) {
			cm.sendNext("Please try again through your party leader.");
			cm.dispose();
			return;
			}
			var em = cm.getEventManager("Xerxes");
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
		cm.sendOk("Please come back if you change your mind. Remember that you can only enter while doing the #b<Eliminate Xerxes>#k quest or when it's completed.");
		}
		cm.dispose();
}