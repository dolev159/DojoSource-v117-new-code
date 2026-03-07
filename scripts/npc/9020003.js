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
	cm.sendSimple("#b#L2#Begin Protect Kenta PQ#l\r\n#L3#Kenta Goggles (20 Pianus Scales - #i 4001535#)\r\n\r\n#lOR\r\n#L4#Exhange 20 Pianus Scales for 20 #i 4310025#  (!!!)#l#k");
    } else if (status == 1) {
	    } else {
		var pqType = Packages.server.MaplePQManager.PQType.KENTA;
		if (Packages.server.MaplePQManager.canEnter(cm.getPlayer(), pqType)) {
			var em = cm.getEventManager("Kenta");
			if (em == null) {
				cm.sendOk("Kenta is fine at the moment. Please try again later.");
			} else {
				var prop = em.getProperty("state");
				if (prop.equals("0") || prop == null) {
					em.startInstance(cm.getPlayer().getParty(), cm.getPlayer().getMap(), 200);
				} else {
					cm.sendOk("Another party quest has already entered this channel.");
				}
			}
		}
	    }
	} else if (selection == 3) {
		if (!cm.canHold(1022123,1)) {
			cm.sendOk("Make room in Equip.");
		} else if (cm.haveItem(4001535, 20)) { //TODO JUMP
			cm.gainItem(1022123, 1);
			cm.gainItem(4001535, -20);
			cm.sendOk("Enjoy your Kenta's Goggles.");
			cm.dispose();
		} else {
			cm.sendOk("Come back to be when you have 20 Pianus Scales.");
		}
	} 
	cm.dispose();
	if (selection == 4) {
		if (cm.haveItem(4001535, 20)) { //TODO JUMP
			cm.gainItem(4310025, 20);
			cm.gainItem(4001535, -20);
			cm.sendOk("Enjoy with your new 20 #i 4310025#. \r\nYou can use these coins in Free Market.");
			cm.dispose();
		}else { 
			cm.sendOk("Come back to be when you have 20 Pianus Scales.");
}
}
    }
}