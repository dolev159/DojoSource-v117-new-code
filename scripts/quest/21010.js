/*
    Name: 英雄的歸來 (Return of the Hero)
    Map: 寒冷的森林１ (Cold Forest 1)
    ID: 21010
    Nexus Omni v117 Standard
*/

var status = -1;

function start(mode, type, selection) {
    if (mode == -1) {
        qm.dispose();
        return;
    }
    if (mode == 0 && status == 3) {
        qm.sendNext("Oh, no need to decline my offer. It's no big deal. It's just a potion. Well, let me know if you change your mind.");
        qm.dispose();
        return;
    }
    if (mode == 1) status++; else status--;

    if (status == 0) {
        qm.sendNext("Hm, what's a human doing on this island? Wait, it's #p1201000#. What are you doing here, #p1201000#? And who's that beside you? Is it someone you know, #p1201000#? What? The hero, you say?");
    } else if (status == 1) {
        qm.sendNextPrev("#v4001170#");
    } else if (status == 2) {
        qm.sendNextPrev("Ah, this must be the hero you and your clan have been waiting for. Am I right, #p1201000#? Ah, I knew you weren't just accompanying an average passerby...");
    } else if (status == 3) {
        qm.sendAcceptDecline("Oh, but it seems our hero has become very weak since the Black Mage's curse. It's only makes sense, considering that the hero has been asleep for hundreds of years. #bHere, I'll give you a HP Recovery Potion.");
    } else if (status == 4) {
        qm.getPlayer().addHP(qm.getPlayerStat("HP") > 40 ? -25 : 0);
        // Note: Reward is typically handled by forceStart/start if in binary, but this is a tutorial gift
        qm.gainItem(2000022, qm.getPlayer().itemQuantity(2000022) ? 0 : 1);
        qm.sendNextS("Drink it first. Then we'll talk.", 9);
    } else if (status == 5) {
        qm.sendNextPrevS("#b(How do I drink the potion? I don't remember..)", 3);
    } else if (status == 6) {
        if (!qm.getPlayer().hasSummon()) {
            qm.playerSummonHint(true);
        }
        qm.summonMsg(14); // Drink potion hint
        qm.forceStartQuest();
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
        qm.sendNext("We've been digging and digging inside the Ice Cave in the hope of finding a hero, but I never thought I'd actually see the day... The prophecy was true! You were right, #p1201000#! Now that one of the legendary heroes has returned, we have no reason to fear the Black Mage!");
    } else if (status == 1) {
        qm.sendNextPrev("Oh, I've kept you too long. I'm sorry, I got a little carried away. I'm sure the other Penguins feel the same way. I know you're busy, but could you #bstop and talk to the other Penguins#k on your way to town? They would be so honored. \r\n\r\n#fUI/UIWindow.img/QuestIcon/4/0# \r\n#v2000022# 5 #t2000022# \r\n#v2000023# 5 #t2000023# \r\n\r\n#fUI/UIWindow.img/QuestIcon/8/0# 16 exp");
    } else if (status == 2) {
        if (qm.getQuestStatus(21010) == 1) { // 1 = Started
            qm.forceCompleteQuest();
        }
        qm.sendNextPrevS("Oh, you've leveled up! You may have even received some skill points. In Maple World, you can acquire 3 skill points every time you level up. Press the #bK key #kto view the Skill window.", 9);
    } else if (status == 3) {
        qm.sendNextPrevS("#b(Everyone's been so nice to me, but I just can't remember anything. Am I really a hero? I should check my skills and see. But how do I check them?)", 3);
    } else if (status == 4) {
        if (!qm.getPlayer().hasSummon()) {
            qm.playerSummonHint(true);
        }
        qm.summonMsg(15); // Skill window hint
        qm.dispose();
    }
}