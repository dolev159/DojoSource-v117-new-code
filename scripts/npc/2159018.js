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
    if (status == 0) {
	cm.sendSimple("#b#L2#Go to Ice Knight with a party.#l\r\n#L3#Iceman's Chain (10 Cold Ice)#l\r\n#L4#Iceman's Earring (20 Cold Ice)#l#k");
    } else if (status == 1) {
	    } else {
		var pqType = Packages.server.MaplePQManager.PQType.ICE_KNIGHT;
		if (Packages.server.MaplePQManager.canEnter(cm.getPlayer(), pqType)) {
			var em = cm.getEventManager("Iceman");
			if (em == null) {
				cm.sendOk("I don't wanna save my friend at the moment. Please try again later.");
			} else {
				var prop = em.getProperty("state");
				if (prop.equals("0") || prop == null) {
					em.startInstance(cm.getPlayer().getParty(), cm.getPlayer().getMap(), 70);
				} else {
					cm.sendOk("Another party quest has already entered this channel.");
				}
			}
		}
	    }
	} else if (selection == 3) {
		if (!cm.canHold(1072510,1)) {
			cm.sendOk("Make room in Equip.");
		} else if (cm.haveItem(4001529,10)) { //TODO JUMP
			cm.gainItem(1072510, 1);
			cm.gainItem(4001529, -10);
		} else {
			cm.sendOk("Come back with 10 Cold Ice.");
		}
	} else if (selection == 4) {
		if (!cm.canHold(1032100,1)) {
			cm.sendOk("Make room in Equip.");
		} else if (cm.haveItem(4001529,20)) { //TODO JUMP
			cm.gainItem(1032100, 1);
			cm.gainItem(4001529, -20);
		} else {
			cm.sendOk("Come back with 20 Cold Ice.");
		}
	}
	cm.dispose();
    }
}