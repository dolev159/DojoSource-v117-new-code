/*
    Name: 餵食地獄獵犬 (Feeding the Dog)
    Map: 前院 (Front Yard)
    ID: 22001
    Nexus Omni v117 Standard
*/

var status = -1;

function start(mode, type, selection) {
    if (mode == -1) {
        qm.dispose();
        return;
    }
    if (mode == 0 && status == 2) {
        qm.sendNext("Stop being lazy. Do you want to see your brother bitten by a dog? Hurry up! Talk to me again and accept the quest!");
        qm.dispose();
        return;
    }
    if (mode == 1) status++; else status--;

    if (status == 0) {
        qm.sendNext("Haha. I had a good laugh. Hahaha. But enough with that nonsense. Feed #p1013102#, would you?");
    } else if (status == 1) {
        qm.sendNextPrevS("#bWhat? That's #p1013101#'s job!", 2);
    } else if (status == 2) {
        qm.sendAcceptDecline("You little brat! I told you to call me Older Brother! You know how much #p1013102# hates me. He'll bite me if I go near him. You feed him. He likes you.");
    } else if (status == 3) {
        if (qm.getInventory(4).getNumFreeSlot() < 1) { // 4 = ETC
            qm.sendNext("What's all that in your Inventory? I can't give you any Dog Food then. Empty a slot in your Etc window.");
            qm.dispose();
            return;
        }
        qm.forceStartQuest();
        qm.gainItem(4032447, qm.getPlayer().itemQuantity(4032447) ? 0 : 1);
        qm.sendNext("Hurry up and head #bleft#k to feed #b#p1013102##k. He's been barking to be fed all morning.");
    } else if (status == 4) {
        qm.sendNextPrev("Feed #p1013102# and come back to see me.");
    } else if (status == 5) {
        qm.dispose();
    }
}