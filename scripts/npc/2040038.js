
/*
	Yellow Balloon - LudiPQ 3rd stage NPC
*/

var status = -1; 
var exp = 2940;
			
function action(mode, type, selection) {
    if (cm.getMap().getEventStatus("stage3status") == "clear") {
        cm.sendNext("Congratulations! You've passed the 3rd stage. Hurry on now, to the 4th stage.");
        cm.dispose();
        return;
    }

    if (cm.isLeader()) {
        if (cm.haveItem(4001022, 32)) {
            cm.sendNext("Congratulations! You've passed the 3rd stage. Hurry on now, to the 4th stage.");
            cm.removeAll(4001022);
            server.MaplePQManager.stageClear(cm.getChar(), 3);
            cm.givePartyExp(2940);
            cm.dispose();
        } else {
            cm.sendOk("Welcome to the 3rd stage. Go around, and collect #rPasses of Dimension#k from the #bBloctupuses#k that spawn when you break the boxes in this map. Once you're done, get your party members to hand all the #rPasses#k to you, then talk to me again.");
            cm.dispose();
        }
    } else {
        cm.sendNext("Welcome to the 3rd stage. Go around, and collect #rPasses of Dimension#k from the #bBloctupuses#k that spawn when you break the boxes in this map. Once you're done, hand all the #rPasses#k to your party leader.");
        cm.dispose();
    }
}

function clear(stage, eim, cm) {
    eim.setProperty("stage" + stage.toString() + "status","clear");

    cm.showEffect(true, "quest/party/clear");
    cm.playSound(true, "Party1/Clear");
    cm.environmentChange(true, "gate");
}