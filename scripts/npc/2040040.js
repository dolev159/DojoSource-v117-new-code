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

    if (cm.getMapId() == 922010500) {
        if (status == 0) {
            cm.sendNext("I am the officer in charge of the 5th stage. Kill all monsters in the maze sub-maps and bring me the passes.");
        } else if (status == 1) {
            if (cm.getParty() == null || !cm.isLeader()) {
                cm.sendOk("Only your party leader can talk to me.");
                cm.dispose();
            } else {
                if (Packages.server.MaplePQManager.checkLudiPQStage5(cm.getPlayer())) {
                    if (cm.haveItem(4001022, 24)) {
                        cm.gainItem(4001022, -24);
                        Packages.server.MaplePQManager.stageClear(cm.getPlayer(), 5);
                        cm.gainPartyExp(7200);
                        cm.sendOk("You've cleared the stage! The portal is now open.");
                        cm.dispose();
                    } else {
                        cm.sendOk("You don't have enough Dimension Tickets. You need 24.");
                        cm.dispose();
                    }
                } else {
                    cm.sendOk("The maze is still full of monsters. Go and kill them all!");
                    cm.dispose();
                }
            }
        }
    } else {
        cm.sendOk("I am the officer in charge of the 5th stage.");
        cm.dispose();
    }
}