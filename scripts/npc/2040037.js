/**
	Orange Balloon - LudiPQ 2nd stage NPC
**/

var status;
var exp = 2520;
			
function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (cm.getMap().getEventStatus("stage2status") == "clear") {
        cm.sendNext("Congratulations! You've passed the 2nd stage. Hurry on now, to the 3rd stage.");
        cm.dispose();
        return;
    }

    if (cm.isLeader()) {
        if (cm.getMap().getEventStatus("stage2") == "10") {
            cm.sendNext("Congratulations! You've passed the 2nd stage. Hurry on now, to the 3rd stage.");
            cm.removeAll(4001022);
            server.MaplePQManager.stageClear(cm.getChar(), 2);
            cm.givePartyExp(2520);
            cm.dispose();
        } else {
            cm.sendOk("Welcome to the 2nd stage. Go around, and collect #rPasses of Dimension#k from the boxes in this map. Be careful, one of the boxes will lead you into a trap. Once you're done, get your party members to hand all the #rPasses#k to you, then talk to me again.");
            cm.dispose();
        }
    } else {
        cm.sendNext("Welcome to the 2nd stage. Go around, and collect #rPasses of Dimension#k from the boxes in this map. Be careful, one of the boxes will lead you into a trap. Once you're done, hand all the #rPasses#k to your party leader.");
        cm.dispose();
    }
}

function clear(stage, eim, cm) {
    eim.setProperty("stage" + stage.toString() + "status","clear");
    
    cm.showEffect(true, "quest/party/clear");
    cm.playSound(true, "Party1/Clear");
    cm.environmentChange(true, "gate");
}