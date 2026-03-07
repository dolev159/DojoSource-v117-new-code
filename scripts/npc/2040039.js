/**
 * @author: Eric
 * @npc: Lime Balloon - LudiPQ 2nd (was 4th) stage NPC
*/

var status = 0;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (cm.getMap().getEventStatus("stage4status") == "clear") {
        cm.sendNext("Congratulations on clearing the quests for this stage. Please use the portal you see over there and move on to the next stage.");
        cm.dispose();
        return;
    }

    if (cm.isLeader()) {
        if (cm.getMap(922010401).getAllMonstersThreadsafe().size() == 0 && 
            cm.getMap(922010402).getAllMonstersThreadsafe().size() == 0 && 
            cm.getMap(922010403).getAllMonstersThreadsafe().size() == 0 && 
            cm.getMap(922010404).getAllMonstersThreadsafe().size() == 0 && 
            cm.getMap(922010405).getAllMonstersThreadsafe().size() == 0) {
            
            cm.sendNext("Congratulations on clearing the quests for this stage. Please use the portal you see over there and move on to the next stage.");
            server.MaplePQManager.stageClear(cm.getChar(), 4);
            cm.givePartyExp(3360);
            cm.dispose();
        } else {
            cm.sendOk("In the second stage, the Dimensional Schism has spawned a place of pure darkness. Monsters called #b#o9300008##k have hidden themselves in the darkness. Defeat all of them, and then talk to me to proceed to the next stage.");
            cm.dispose();
        }
    } else {
        cm.sendNext("In the second stage, the Dimensional Schism has spawned a place of pure darkness. Monsters called #b#o9300008##k have hidden themselves in the darkness. Defeat all of them, and then talk to me to proceed to the next stage.");
        cm.dispose();
    }
}

function clear(stage, eim, cm) {
    eim.setProperty("stage" + stage.toString() + "status","clear");
    cm.showEffect(true, "quest/party/clear");
    cm.playSound(true, "Party1/Clear");
    cm.environmentChange(true, "gate");
}