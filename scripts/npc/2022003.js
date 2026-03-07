var status = -1;

function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        if (status == 0) {
            cm.dispose();
            return;
        }
        status--;
    }
    if (status == 0) {
        cm.sendSimple("#e<Party Quest: Resurrection of the Hoblin King>#n\r\n\r\nOh, you've come to help me? I've been trapped here for so long... Rex must be stopped!\r\n#b#L0#Enter the Party Quest.#l\r\n#L1#What is the Hoblin King PQ?#l#k");
    } else if (status == 1) {
        if (selection == 0) {
            var pqType = Packages.server.MaplePQManager.PQType.HOB_KING;
            if (Packages.server.MaplePQManager.canEnter(cm.getPlayer(), pqType)) {
                var em = cm.getEventManager("Rex");
                if (em == null) {
                    cm.sendOk("The event is currently unavailable.");
                } else {
                    var prop = em.getProperty("state");
                    if (prop == null || prop.equals("0")) {
                        em.startInstance(cm.getParty(), cm.getMap());
                    } else {
                        cm.sendOk("Another party is already inside.");
                    }
                }
            }
        } else if (selection == 1) {
            cm.sendOk("Rex, the Hoblin King, is trying to regain his power. We must stop him before he escapes! You need a party of 3-6 players, level 75 or higher.");
        }
        cm.dispose();
    }
}