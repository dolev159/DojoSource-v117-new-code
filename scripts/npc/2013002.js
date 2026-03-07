function start() {
    action(1, 0, 0);
}

function action(mode, type, selection) {
    var em = cm.getEventManager("OrbisPQ");
    if (em == null) {
        cm.dispose();
        return;
    }

    if (cm.getMapId() == 920010100) { // Center stage
        if (Packages.server.MaplePQManager.checkOrbisPQStatue(cm.getPlayer())) {
            cm.gainPartyExp(50000);
            cm.warpParty(920011100); // Warp to bonus
        } else {
            cm.sendOk("The statue is not yet restored. Gather all 6 pieces!");
        }
    } else {
        // Post-statue/Bonus exit
        if (cm.canHold(4001158, 1)) {
            cm.gainItem(4001158, 1); // Goddess Feather
            cm.gainNX(100);
            cm.addTrait("will", 50);
            cm.addTrait("charm", 10);
            cm.warp(200080101);
        } else {
            cm.sendOk("Please make room in your ETC inventory.");
        }
    }
    cm.dispose();
}