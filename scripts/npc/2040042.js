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

    if (cm.getMapId() == 922010700) {
        if (status == 0) {
            cm.sendNext("I am the officer in charge of the 7th stage. Defeat all the Rombots and bring me the passes.");
        } else if (status == 1) {
            if (cm.getParty() == null || !cm.isLeader()) {
                cm.sendOk("Only your party leader can talk to me.");
                cm.dispose();
            } else {
                if (cm.haveItem(4001022, 3)) {
                    cm.gainItem(4001022, -3);
                    Packages.server.MaplePQManager.stageClear(cm.getPlayer(), 7);
                    cm.gainPartyExp(9000);
                    cm.sendOk("You've cleared the stage! The portal is now open.");
                    cm.dispose();
                } else {
                    cm.sendOk("You don't have enough Dimension Tickets. You need 3.");
                    cm.dispose();
                }
            }
        }
    } else {
        cm.sendOk("I am the officer in charge of the 7th stage.");
        cm.dispose();
    }
}