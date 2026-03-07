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
    
    var em = cm.getEventManager("Amoria");
    if (em == null) {
        cm.dispose();
        return;
    }
    
    var mapId = cm.getMapId();
    switch(mapId) {
        case 670010500:
            if (!cm.isLeader()) {
                cm.sendOk("I want your leader, only.");
                cm.dispose();
                return;
            }
            if (cm.haveItem(4031597, 30)) {
                cm.mapMessage(6, "Run! To the right! Run for your lives!");
                cm.warpParty(670010600);
                cm.gainItem(4031597, -30);
                cm.gainPartyExp(10000); // GMS like
            } else {
                cm.sendOk("I need 30 Cupid Code Pieces from your party to open the way.");
            }
            break;
        case 670010600:
            if (!cm.isLeader()) {
                cm.sendOk("I want your leader, only.");
                cm.dispose();
                return;
            }
            cm.warpParty(670010700);
            break;
        case 670010700:
            if (!cm.isLeader()) {
                cm.sendOk("I want your leader, only.");
                cm.dispose();
                return;
            }
            if (em.getProperty("apq4").equals("0") || em.getProperty("apq4").equals("1")) {
                cm.warpParty(670010700, 18);
                cm.spawnMob(9400536, 1, 674, 511);
                em.setProperty("apq4", "2");
            } else {
                if (cm.haveItem(4031594, 1)) {
                    cm.gainItem(4031594, -1);
                    cm.warpParty(670010800, -1);
                } else {
                    cm.sendOk("I need the Geist Fang from Geist Balrog...");
                }
            }
            break;
    }
    cm.dispose();
}