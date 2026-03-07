var status = -1;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        cm.dispose();
        return;
    }

    var em = cm.getEventManager("OrbisPQ");
    if (em == null) {
        cm.sendOk("The PQ system is currently unavailable.");
        cm.dispose();
        return;
    }

    if (cm.getMapId() == 920011200) { // exit map
        for (var i = 4001044; i < 4001064; i++) {
            cm.removeAll(i);
        }
        cm.warp(200080101);
        cm.dispose();
        return;
    }

    if (!cm.isLeader()) {
        cm.sendOk("I only wish to speak to your leader!");
        cm.dispose();
        return;
    }

    if (em.getProperty("pre") == "0") {
        for (var i = 4001044; i < 4001064; i++) {
            cm.removeAll(i);
        }
        cm.sendNext("Please save Minerva! She has been sealed by Papa Pixie. Collect the 20 Cloud Pieces and place them in the orb behind me!");
        cm.dispose();
        return;
    }

    var mapId = cm.getMapId();
    switch(mapId) {
        case 920010100: // Center stage
            if (em.getProperty("stage").equals("4")) {
                if (Packages.server.MaplePQManager.checkOrbisPQStatue(cm.getPlayer())) {
                    cm.sendOk("The Statue is restored! Please talk to Minerva to receive your reward.");
                } else {
                    cm.warpParty(920010800); // Garden (Boss Stage)
                }
            } else {
                cm.sendOk("Gather the six pieces of Minerva's statue from the various rooms!");
            }
            break;
        case 920010200: // Walkway (Stage 1)
            if (cm.haveItem(4001050, 30)) {
                cm.gainItem(4001050, -30);
                cm.gainItem(4001044, 1);
                Packages.server.MaplePQManager.stageClear(cm.getPlayer(), 101); // Custom stage for Orbis
                cm.gainPartyExp(3500);
            } else {
                cm.sendOk("Gather 30 Statue Pieces (Stage 1) from the monsters here.");
            }
            break;
        case 920010300: // Storage (Stage 2)
            if (cm.haveItem(4001051, 15)) {
                cm.gainItem(4001051, -15);
                cm.gainItem(4001045, 1);
                Packages.server.MaplePQManager.stageClear(cm.getPlayer(), 102);
                cm.gainPartyExp(3500);
            } else {
                cm.sendOk("Gather 15 Statue Pieces (Stage 2) from the monsters here.");
            }
            break;
        case 920010400: // Lobby (Stage 3 - LP)
            var day = java.util.Calendar.getInstance().get(java.util.Calendar.DAY_OF_WEEK);
            var lpId = 4001055 + day;
            if (cm.haveItem(lpId, 1)) {
                cm.gainItem(lpId, -1);
                cm.gainItem(4001046, 1);
                Packages.server.MaplePQManager.stageClear(cm.getPlayer(), 103);
                cm.gainPartyExp(3500);
            } else {
                cm.sendOk("Find the LP for " + getDayName(day) + " and place it on the music player.");
            }
            break;
        case 920010500: // Sealed (Stage 4 - Combination)
            if (Packages.server.MaplePQManager.checkOrbisPQStage4(cm.getPlayer())) {
                cm.gainItem(4001047, 1);
                Packages.server.MaplePQManager.stageClear(cm.getPlayer(), 104);
                cm.gainPartyExp(3500);
            } else {
                cm.sendOk("Incorrect combination on the platforms.");
            }
            break;
        case 920010600: // Lounge (Stage 5)
            if (cm.haveItem(4001052, 30)) {
                cm.gainItem(4001052, -30);
                cm.gainItem(4001048, 1);
                Packages.server.MaplePQManager.stageClear(cm.getPlayer(), 105);
                cm.gainPartyExp(3500);
            } else {
                cm.sendOk("Gather 30 Statue Pieces (Stage 5) from the monsters here.");
            }
            break;
        case 920010700: // Way up (Stage 6 - Levers)
            if (Packages.server.MaplePQManager.checkOrbisPQStage6(cm.getPlayer())) {
                cm.gainItem(4001049, 1);
                Packages.server.MaplePQManager.stageClear(cm.getPlayer(), 106);
                cm.gainPartyExp(3500);
            } else {
                cm.sendOk("Incorrect combination for the levers.");
            }
            break;
        default:
            cm.sendOk("Please help us restore the tower!");
            break;
    }
    cm.dispose();
}

function getDayName(day) {
    var names = ["", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return names[day];
}