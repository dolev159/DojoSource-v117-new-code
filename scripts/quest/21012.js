/*
    Name: 奇怪的夢 (Strange Dream)
    Map: 客廳 (Living Room)
    ID: 22000
    Nexus Omni v117 Standard
*/

var status = -1;

function start(mode, type, selection) {
    if (mode == -1) {
        qm.dispose();
        return;
    }
    if (mode == 0 && status > 6) {
        qm.sendNext("Hm? Don't you want to tell #p1013101#? You have to be nice to your brother, dear.");
        qm.dispose();
        return;
    }
    if (mode == 1) status++; else status--;

    if (status == 0) {
        qm.sendNext("Did you sleep well, Evan?");
    } else if (status == 1) {
        qm.sendNextPrevS("#bYes, what about you, Mom?", 2);
    } else if (status == 2) {
        qm.sendNextPrev("I did as well, but you seem so tired. Are you sure you slept okay? Did the thunder and lightning last night keep you up?");
    } else if (status == 3) {
        qm.sendNextPrevS("#bOh, no. It's not that, Mom. I just had a strange dream last night.", 2);
    } else if (status == 4) {
        qm.sendNextPrev("A strange dream? What kind of strange dream?");
    } else if (status == 5) {
        qm.sendNextPrevS("#bWell...", 2);
    } else if (status == 6) {
        qm.sendNextPrevS("#b(You explain that you met a dragon in your dream.)", 2);
    } else if (status == 7) {
        qm.sendAcceptDecline("Hahaha, a dragon? That's incredible. I'm glad he didn't swallow you whole! You should tell #p1013101# about your dream. I'm sure he'll enjoy it.");
    } else if (status == 8) {
        qm.forceStartQuest();
        qm.sendNextS("#b#p1013101##k went to the #b#m100030102##k to feed the Bull Dog. You'll see him right outside.", 1);
    } else if (status == 9) {
        qm.evanTutorial("UI/tutorial/evan/1/0", 1);
        qm.dispose();
    }
}

function end(mode, type, selection) {
    if (mode == -1) {
        qm.dispose();
        return;
    }
    if (mode == 1) status++; else status--;

    if (status == 0) {
        qm.sendYesNo("Hm... Your expression tells me that the exercise didn't jog any memories. But don't you worry. They'll come back, eventually. Here, drink this potion and power up! \r\n\r\n#fUI/UIWindow.img/QuestIcon/4/0# \r\n#v2000022# 10 #t2000022# \r\n#v2000023# 10 #t2000023# \r\n\r\n#fUI/UIWindow.img/QuestIcon/8/0# 57 exp");
    } else if (status == 1) {
        if (qm.getQuestStatus(21012) == 1) {
            qm.forceCompleteQuest();
        }
        qm.sendOkS("#b(Even if you're really the hero everyone says you are... What good are you without any skills?)", 2);
        qm.dispose();
    }
}