var status = -1;

function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        if (status == 0) {
            cm.dispose();
        }
        status--;
    }
    
    if (cm.getPlayer().getMapId() == 670011000) {
        cm.gainNX(100); // Zipangu reward
        cm.warp(670010000, 0);
        cm.dispose();
        return;
    }
    
    var em = cm.getEventManager("Amoria");
    if (em == null || !cm.isLeader()) {
        cm.dispose();
        return;
    }
    
    if (em.getProperty("apq1").equals("0")) {
        if (cm.getMap().getAllMonstersThreadsafe().size() == 0) {
            em.setProperty("apq1", "1");
            cm.mapMessage(5, "The Magik Fiarry has been spawned somewhere in the map.");
            cm.spawnMonster(9400518, 1);
        } else {
            cm.sendOk("Please eliminate all the monsters first!");
        }
    } else if (em.getProperty("apq1").equals("1")) {
        if (cm.haveItem(4031595)) {
            cm.gainItem(4031595, -1);
            cm.showEffect(true, "quest/party/clear");
            cm.playSound(true, "Party1/Clear");
            em.setProperty("apq1", "2");
            cm.sendOk("The mirror has been shattered. Please proceed to the next stage.");
        } else {
            cm.sendOk("Bring me proof that the mirror has been broken!");
        }
    }
    cm.dispose();
}