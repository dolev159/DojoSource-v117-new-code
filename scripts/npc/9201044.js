var status = -1;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        if (status == 0) {
            cm.dispose();
        }
        status--;
    }
    
    var em = cm.getEventManager("Amoria");
    if (em == null) {
        cm.dispose();
        return;
    }
    
    var mapId = cm.getMapId();
    switch(mapId) {
        case 670010200:
            if (em.getProperty("apq1").equals("2")) {
                cm.removeAll(4031595);
                cm.removeAll(4031594);
                cm.removeAll(4031597);
                cm.warp(670010300, 0);
            } else {
                if (!cm.isLeader()) {
                    cm.sendOk("I want your leader, only.");
                    cm.dispose();
                    return;
                }
                cm.getMap().getPortal("go01").setPortalState(true);
                cm.getMap().changeEnvironment("gate0", 2);
                cm.getMap().changeEnvironment("gate1", 2);
                cm.getMap().changeEnvironment("gate2", 2);
                cm.sendOk("The gate is opened.");
            }
            break;
        case 670010300:
            if (!cm.isLeader()) {
                cm.sendOk("I want your leader, only.");
                cm.dispose();
                return;
            }
            if (!em.getProperty("apq2").equals("1")) {
                if (Packages.server.MaplePQManager.checkAPQStage2(cm.getPlayer())) {
                    cm.getMap().getPortal("next00").setPortalState(true);
                    cm.getMap().changeEnvironment("gate", 2);
                    cm.showEffect(true, "quest/party/clear");
                    cm.playSound(true, "Party1/Clear");
                    em.setProperty("apq2", "1");
                    cm.sendOk("Excellent! Proceed to the next stage.");
                } else {
                    cm.showEffect(true, "quest/party/wrong_kor");
                    cm.playSound(true, "Party1/Failed");
                    cm.sendOk("The combination is incorrect.");
                }
            } else {
                cm.sendOk("The portal is already opened!");
            }
            break;
        case 670010400:
            if (!cm.isLeader()) {
                cm.sendOk("I want your leader, only.");
                cm.dispose();
                return;
            }
            if (!em.getProperty("apq3").equals("1")) {
                if (Packages.server.MaplePQManager.checkAPQStage3(cm.getPlayer())) {
                    cm.getMap().getPortal("next00").setPortalState(true);
                    cm.getMap().changeEnvironment("gate", 2);
                    cm.showEffect(true, "quest/party/clear");
                    cm.playSound(true, "Party1/Clear");
                    em.setProperty("apq3", "1");
                    cm.sendOk("Well done! The path is clear.");
                } else {
                    cm.showEffect(true, "quest/party/wrong_kor");
                    cm.playSound(true, "Party1/Failed");
                    cm.sendOk("That's not it. Try a different distribution.");
                }
            } else {
                cm.sendOk("The portal is already opened!");
            }
            break;
    }
    cm.dispose();
}