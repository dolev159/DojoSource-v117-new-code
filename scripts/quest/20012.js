/*
    Name: 你知道技能嗎？ (Do You Know Skills?)
    Map: 開始之森林4 (Forest of Beginning 4)
    ID: 20012
    Nexus Omni v117 Standard
*/

var status = -1;

function start(mode, type, selection) {
    if (mode == -1) {
        qm.dispose();
        return;
    }
    if (mode == 0 && status == 2) {
        qm.sendNext("Regular Attacks are basic skills that are easy to use. It is important to remember that real hunting is done using your Skills. I suggest you reconsider.");
        qm.dispose();
        return;
    }
    if (mode == 1) status++; else status--;

    if (status == 0) {
        qm.sendNext("I've been waiting for you, #h0#. My name is Kinu and I'm the third brother you are going to meet. So, you've learned about using Regular Attacks, correct? Well, next you'll be learning about your #bSkills#k, which you will find very helpful in Maple World.");
    } else if (status == 1) {
        qm.sendNextPrev("You earn Skill Points every time you level up, which means you probably have a few saved up already. Press the #bK key#k to see your skills. Invest your Skill Points in the skill you wish to strengthen and don't forget to #bplace the skill in a Quick Slot for easy use#k.");
    } else if (status == 2) {
        qm.sendAcceptDecline("Time to practice before you forget. You will find a lot of Tivs in this area. Why don't you hunt #r3 Tivs#k using your #bThree Snails skill and bring me 1 #t4000483##k as proof? I'll wait for you here.");
    } else if (status == 3) {
        qm.playerSummonHint(true);
        qm.summonMsg(5);
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
        qm.sendNext("You've successfully defeated the Tivs and brought me a #t4000483#. That's very impressive! #bYou earn 3 Skill Points every time you level up, after you officially become a knight, that is. Keep following the arrow to the left, and you'll meet Kia#k, who will guide you through the next step. \r\n\r\n#fUI/UIWindow.img/QuestIcon/4/0# \r\n#fUI/UIWindow.img/QuestIcon/8/0# 42 exp");
    } else if (status == 1) {
        if (qm.getQuestStatus(20012) == 1) {
            qm.playerSummonHint(true);
            qm.summonMsg(7);
            qm.forceCompleteQuest();
            qm.gainItem(4000483, -1);
            qm.gainExp(42);
        }
        qm.dispose();
    }
}