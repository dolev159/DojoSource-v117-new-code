/*
	Red Balloon - LudiPQ 1st stage NPC
**/

var status;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (cm.getMap().getEventStatus("stage1status") == "clear") {
        cm.sendNext("Congratulations! You've passed the 1st stage. Hurry on now, to the 2nd stage.");
        cm.dispose();
        return;
    }

    if (cm.isLeader()) {
        if (cm.getMap().getAllMonstersThreadsafe().size() == 0) {
            cm.sendNext("Congratulations! You've passed the 1st stage. Hurry on now, to the 2nd stage.");
            server.MaplePQManager.stageClear(cm.getChar(), 1);
            cm.givePartyExp(2100);
            cm.dispose();
        } else {
            cm.sendOk("Welcome to the 1st stage. Go around, and collect #rPasses of Dimension#k from the #bRatz#k and #bBlack Ratz#k in this map. Once you're done, get your party members to hand all the #rPasses#k to you, then talk to me again.");
            cm.dispose();
        }
    } else {
        cm.sendNext("Welcome to the 1st stage. Go around, and collect #rPasses of Dimension#k from the #bRatz#k and #bBlack Ratz#k in this map. Once you're done, hand all the #rPasses#k to your party leader.");
        cm.dispose();
    }
}

function clear(stage, eim, cm) {
    eim.setProperty("stage" + stage.toString() + "status","clear");
    
    cm.showEffect(true, "quest/party/clear");
    cm.playSound(true, "Party1/Clear");
    cm.environmentChange(true, "gate");
}