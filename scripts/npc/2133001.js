var status = -1;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        status--;
    }
    
    var mapId = cm.getMapId();
    switch(mapId) {
        case 930000000:
            cm.sendNext("Welcome to the Forest of Poison Haze. Please enter the portal to begin.");
            break;
        case 930000100:
            if (Packages.server.MaplePQManager.checkEllinPQStage1(cm.getPlayer())) {
                cm.sendNext("Excellent! All contaminated monsters have been eliminated. Please proceed.");
            } else {
                cm.sendNext("We must eliminate all these contaminated monsters before we can move on!");
            }
            break;
        case 930000200:
            if (Packages.server.MaplePQManager.checkEllinPQStage2(cm.getPlayer())) {
                cm.sendNext("The spine has been cleared! Great job.");
            } else {
                cm.sendNext("The spine blocks our path. We must eliminate the contaminated reactors to proceed.");
            }
            break;
        case 930000300:
            cm.warpParty(930000400);
            break;
        case 930000400:
            if (cm.haveItem(4001169, 20)) {
                cm.warpParty(930000500);
                cm.gainItem(4001169, -20);
                cm.gainPartyExp(7000); // GMS base 
            } else if (!cm.haveItem(2270004)) {
                cm.gainItem(2270004, 10);
                cm.sendOk("Use these Monster Marbles to purify the monsters. Bring me 20 purified Monster Marbles!");
            } else {
                cm.sendOk("We need 20 purified Monster Marbles. Keep trying!");
            }
            break;
        case 930000600:
            cm.sendNext("The Poison Golem is near! Place the Purple Stone of Magic on the Altar to draw it out!");
            break;
        case 930000700:
            cm.removeAll(4001163);
            cm.removeAll(4001169);
            cm.removeAll(2270004);
            cm.warp(930000800, 0);
            break;
    }
    cm.dispose();
}