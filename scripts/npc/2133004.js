function start() {
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (cm.getMapId() == 930000500) {
        if (!cm.haveItem(4001163)) {
            cm.sendNext("Please find the Purple Stone of Magic in this room and bring it to me.");
        } else {
            cm.warpParty(930000600);
            cm.gainPartyExp(7000);
        }
    } else {
        cm.sendNext("Please hurry, we must stop the golem!");
    }
    cm.dispose();
}