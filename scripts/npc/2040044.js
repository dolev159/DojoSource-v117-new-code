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

    if (cm.getMapId() == 922010900) {
        if (status == 0) {
            cm.sendNext("You have defeated Alishar! Collect the Dimensional Key and talk to me to finish the quest.");
        } else if (status == 1) {
            if (cm.getParty() == null || !cm.isLeader()) {
                cm.sendOk("Only your party leader can talk to me.");
                cm.dispose();
            } else {
                if (cm.haveItem(4001008, 1)) {
                    cm.gainItem(4001008, -1);
                    Packages.server.MaplePQManager.stageClear(cm.getPlayer(), 9);
                    cm.gainPartyExp(45000);
                    cm.sendOk("Congratulations on finishing the Ludibrium Party Quest!");
                    cm.dispose();
                } else {
                    cm.sendOk("You still haven't defeated Alishar, or you don't have the key.");
                    cm.dispose();
                }
            }
        }
    } else {
        cm.sendOk("I am the officer in charge of the crack on the wall.");
        cm.dispose();
    }
}