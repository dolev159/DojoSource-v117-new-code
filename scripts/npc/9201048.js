var status = -1;

function action(mode, type, selection) {
    if (mode == 1) {
	status++;
    } else {
	if (status == 0) {
	    cm.dispose();
	}
	status--;
    }
		cm.removeAll(4031595);
		cm.removeAll(4031594);
		cm.removeAll(4031597);
    if (status == 0) {
	cm.sendSimple("#b#L0#Get out of here (no refunds)#l\r\n#L1#My party is ready and we want to go in.#l#k");
    } else if (status == 1) {
	if (selection == 0) {
	    cm.warp(670010000, 0);
	} else {
	    if (Packages.server.MaplePQManager.canEnter(cm.getPlayer(), Packages.server.MaplePQManager.PQType.AMORIA_PQ)) {
			var em = cm.getEventManager("Amoria");
			if (em == null) {
				cm.sendOk("Please try again later.");
			} else {
				em.startInstance(cm.getPlayer().getParty(), cm.getPlayer().getMap());
			}
		}
	}
	cm.dispose();
    }
}