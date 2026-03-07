var status = -1;
var minLevel = 70;
var maxLevel = 255;
var minPartySize = 2;
var maxPartySize = 6;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        if (status == 0) {
            cm.dispose();
            return;
        }
        status--;
    }

    if (cm.getMapId() == 920010000) { // inside orbis pq
        cm.sendOk("We have to save Chamberlain Eak! Restore the 20 Cloud Pieces!");
        cm.dispose();
        return;
    }

    if (status == 0) {
        // Clear items upon start/entry
        for (var i = 4001044; i < 4001064; i++) {
            cm.removeAll(i);
        }
        
        if (cm.getParty() == null) {
            cm.sendSimple("Teamwork is essential for the Orbis Party Quest. If you have a party between levels 70-255, please have your leader talk to me.\r\n\r\n#L0#I want the Minerva Wristband.#l\r\n#L1#I want the Minerva Shoes.#l");
        } else if (!cm.isLeader()) {
            cm.sendSimple("Please tell your party leader to talk to me.#b\r\n#L0#I want the Minerva Wristband.#l\r\n#L1#I want the Minerva Shoes.#l");
        } else {
            var pqType = Packages.server.MaplePQManager.PQType.ORBIS;
            if (Packages.server.MaplePQManager.canEnter(cm.getPlayer(), pqType)) {
                var em = cm.getEventManager("OrbisPQ");
                if (em == null) {
                    cm.sendOk("The PQ system is currently unavailable.");
                } else {
                    var prop = em.getProperty("state");
                    if (prop == null || prop.equals("0")) {
                        em.startInstance(cm.getParty(), cm.getMap(), 120);
                        cm.dispose();
                        return;
                    } else {
                        cm.sendOk("Another party is already inside. Please wait or try another channel.");
                    }
                }
            } else {
                cm.sendOk("You or someone in your party does not meet the requirements or has exceeded the daily entry limit.");
            }
        }
    } else {
        // Minerva Prizes
        if (selection == 0) {
            if (cm.haveItem(1082232, 1)) {
                if (!cm.canHold(1082322, 1)) {
                    cm.sendOk("Make room for the Wristband.");
                } else if (cm.haveItem(4001158, 10)) {
                    cm.gainItem(1082322, 1);
                    cm.gainItem(4001158, -10);
                } else {
                    cm.sendOk("You need 10 Goddess Feathers.");
                }
            } else if (cm.haveItem(4001158, 10)) {
                if (cm.canHold(1082232, 1)) {
                    cm.gainItem(1082232, 1);
                    cm.gainItem(4001158, -10);
                } else {
                    cm.sendOk("Make room for the Wristband.");
                }
            } else {
                cm.sendOk("You need 10 Goddess Feathers.");
            }
        } else if (selection == 1) {
            if (cm.haveItem(1072455, 1)) {
                if (!cm.canHold(1072534, 1)) {
                    cm.sendOk("Make room for the shoes.");
                } else if (cm.haveItem(4001158, 10)) {
                    cm.gainItem(1072534, 1);
                    cm.gainItem(4001158, -10);
                } else {
                    cm.sendOk("You need 10 Goddess Feathers.");
                }
            } else if (cm.haveItem(4001158, 10)) {
                if (cm.canHold(1072455, 1)) {
                    cm.gainItem(1072455, 1);
                    cm.gainItem(4001158, -10);
                } else {
                    cm.sendOk("Make room for the shoes.");
                }
            } else {
                cm.sendOk("You need 10 Goddess Feathers.");
            }
        }
        cm.dispose();
    }
}