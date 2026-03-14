/*
    Name: 消失的武器 (The Lost Weapon)
    Map: 寒冷的森林２ (Cold Forest 2)
    ID: 21011
    Nexus Omni v117 Standard
*/

var status = -1;

function start(mode, type, selection) {
    if (mode == -1) {
        qm.dispose();
        return;
    }
    if (mode == 1) status++; else status--;

    if (status == 0) {
        qm.sendNext("Wait, are you... No way... Are you the hero that #p1201000# has been talking about all this time?! #p1201000#! Don't just nod... Tell me! Is this the hero you've been waiting for?!");
    } else if (status == 1) {
        qm.sendNextPrev("#v4001171#");
    } else if (status == 2) {
        qm.sendNextPrev("I'm sorry. I'm just so overcome with emotions... *Sniff sniff* My goodness, I'm starting to tear up. You must be so happy, #p1201000#.");
    } else if (status == 3) {
        qm.sendNextPrev("Wait a minute... You're not carrying any weapons. From what I've heard, each of the heroes had a special weapon. Oh, you must have lost it during the battle against the Black Mage.");
    } else if (status == 4) {
        qm.sendAcceptDecline("This isn't good enough to replace your weapon, but #bcarry this sword with you for now#k. It's my gift to you. A hero can't be walking around empty-handed.");
    } else if (status == 5) {
        qm.forceStartQuest();
        qm.sendNextS("#b(You've received a sword, but you don't even remember how to equip it...)", 3);
    } else if (status == 6) {
        if (!qm.getPlayer().hasSummon()) {
            qm.playerSummonHint(true);
        }
        qm.summonMsg(16); // Equip hint
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
        qm.sendNext("It's a gift for the hero! Please accept it. \r\n\r\n#fUI/UIWindow.img/QuestIcon/4/0# \r\n#v1302000# 1 #t1302000# \r\n\r\n#fUI/UIWindow.img/QuestIcon/8/0# 35 exp");
    } else if (status == 1) {
        if (qm.getQuestStatus(21011) == 1) {
            qm.forceCompleteQuest();
            // Reward items/exp handled by forceComplete if in binary, but adding for certainty if needed
            // However, following Nexus Omni standard, we trust the server to handle rewards if binary-sync is complete.
        }
        qm.sendNextS("#b(Your skills are nowhere close to being hero-like... But a sword? Have you ever even held a sword in your lifetime? You can't remember... How do you even equip it?)", 3);
    } else if (status == 2) {
        if (!qm.getPlayer().hasSummon()) {
            qm.playerSummonHint(true);
        }
        qm.summonMsg(16); // Equip hint
        qm.dispose();
    }
}