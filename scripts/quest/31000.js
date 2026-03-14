/*
    Name: 天上之島克里塞 (Chryse, the Floating Island)
    Map: 天空之城公園 (Orbis Park)
    ID: 31000
    Nexus Omni v117 Standard
*/

var status = -1;

function end(mode, type, selection) {
    if (mode == -1) {
        qm.dispose();
        return;
    }
    if (mode == 0 && status == 3) {
        qm.sendNext("Is this a bad time? I really need you to come here...");
        qm.dispose();
        return;
    }
    if (mode == 1) status++; else status--;

    if (status == 0) {
        if (qm.getQuestStatus(31000) == 0) {
            qm.forceStartQuest();
            qm.dispose();
            return;
        }
        qm.sendNext("You're finally here. You have no idea how long I've been waiting for you...");
    } else if (status == 1) {
        qm.sendNextPrev("There is a floating island called Chryse in the sky of Orbis, full of well-meaning giants. \r\nBut some time ago, Chryse drifted away from us, and now we can't make contact with the island.\r\nl am sure something bad has happened... I would love to go look for the island, but as you can see, I can't really leave this place...");
    } else if (status == 2) {
        qm.sendNextPrev("I thought perhaps you could see if something has happened to Chryse. \r\nI will help you get there. Please don't forget to come back and tell me what's going on. Okay?");
    } else if (status == 3) {
        qm.sendYesNo("Are you ready? \r\nIt's going to be a long trip, so you should prepare well. I will send you now.");
    } else if (status == 4) {
        qm.sendNext("Great. I will send you now.");
    } else if (status == 5) {
        if (qm.getQuestStatus(31000) == 1) {
            qm.gainExp(1200);
            qm.forceCompleteQuest();
        }
        qm.warp(200100001, 0);
        qm.topMsg("Pressing the JUMP key allows you to fly to Chryse.");
        qm.dispose();
    }
}