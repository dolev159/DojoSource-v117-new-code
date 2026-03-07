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

    if (cm.getMapId() == 922010800) {
        if (status == 0) {
            cm.sendNext("I am the officer in charge of the 8th stage. Find the correct sequence of players on the platforms.");
        } else if (status == 1) {
            if (cm.getParty() == null || !cm.isLeader()) {
                cm.sendOk("Only your party leader can talk to me.");
                cm.dispose();
            } else {
                if (Packages.server.MaplePQManager.checkLudiPQStage8(cm.getPlayer())) {
                    Packages.server.MaplePQManager.stageClear(cm.getPlayer(), 8);
                    cm.gainPartyExp(10000);
                    cm.sendOk("You've cleared the stage! The portal is now open.");
                    cm.dispose();
                } else {
                    cm.sendOk("The sequence is incorrect or players are missing.");
                    cm.dispose();
                }
            }
        }
    } else {
        cm.sendOk("I am the officer in charge of the 8th stage.");
        cm.dispose();
    }
}