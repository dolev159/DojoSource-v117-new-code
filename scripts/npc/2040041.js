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

    if (cm.getMapId() == 922010600) {
        if (status == 0) {
            cm.sendNext("I am the officer in charge of the 6th stage. Find your way through the teleport boxes and talk to me to clear the stage.");
        } else if (status == 1) {
            if (cm.getParty() == null || !cm.isLeader()) {
                cm.sendOk("Only your party leader can talk to me.");
                cm.dispose();
            } else {
                if (Packages.server.MaplePQManager.checkLudiPQStage6(cm.getPlayer())) {
                    Packages.server.MaplePQManager.stageClear(cm.getPlayer(), 6);
                    cm.gainPartyExp(8000);
                    cm.sendOk("You've cleared the stage! The portal is now open.");
                    cm.dispose();
                } else {
                    cm.sendOk("You haven't completed the teleport box puzzle yet.");
                    cm.dispose();
                }
            }
        }
    } else {
        cm.sendOk("I am the officer in charge of the 6th stage.");
        cm.dispose();
    }
}
