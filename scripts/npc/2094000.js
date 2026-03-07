

function action(mode, type, selection) {
	cm.removeAll(4001117);
	cm.removeAll(4001120);
	cm.removeAll(4001121);
	cm.removeAll(4001122);
	    if (cm.getPlayer().getParty() == null || !cm.isLeader()) {
		cm.sendOk("The leader of the party must be here.");
	    } else {
		var pqType = Packages.server.MaplePQManager.PQType.PIRATE;
		if (Packages.server.MaplePQManager.canEnter(cm.getPlayer(), pqType)) {
			var em = cm.getEventManager("Pirate");
			if (em == null) {
				cm.sendOk("Please try again later.");
			} else {
				var prop = em.getProperty("state");
				if (prop.equals("0") || prop == null) {
					em.startInstance(cm.getPlayer().getParty(), cm.getPlayer().getMap(), 120);
				} else {
					cm.sendOk("Another party quest has already entered this channel.");
				}
			}
		}
	    }
	cm.dispose();
}