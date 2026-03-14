/*
    Name: 弩弓箭手之路 (Path of the Crossbowman)
    Map: 弓箭手培訓中心 (Archer Training Center)
    ID: 1420
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
        qm.sendNext("You really wish to become a Crossbowman? Crossbowmen utilize crossbows over bows. Though they attack slower, their single shots are more powerful and accurate than any other.");
    } else if (status == 1) {
        qm.sendNextPrev("Crossbowmen learn #bCrossbow Mastery#k, giving them greater control over their weapons. They also learn #bCrossbow Booster#k to fire arrows quickly, and #bFinal Attack#k to hit with more power. And let's not forget #bPhysical Training#k, which allows you to fire arrows with even greater skill.");
    } else if (status == 2) {
        qm.sendNextPrev("The #bIron Arrow#k skill fires a powerful arrow that penetrates enemy defenses. They can also Summon the #bGolden Eagle#k to automatically attack enemies for a short time.");
    } else if (status == 3) {
        qm.sendNextPrev("Of course, Crossbowmen must always have arrows on hand. That is, unless you learn #bSoul Arrow#k, which lets you use the power of your soul to attack even without physical arrows.");
    } else if (status == 4) {
        qm.sendNextPrev("People used to say Crossbowmen were too slow, but with #bDouble Jump#k they can jump a second time while in the air, making them quite agile.");
    } else if (status == 5) {
        qm.sendNextPrev("The only way to truly understand is by becoming a Crossbowman. If you wish to discover this for yourself, I will test you to see you're ready.");
    } else if (status == 6) {
        qm.sendNextPrev("The test is simple. Go to the test site, eliminate the monsters there, and return with #r30 Dark Marbles#k. These monsters are tough, so be careful.");
    } else if (status == 7) {
        qm.sendAcceptDecline("If you run out of potions, you will have to #bforfeit the quest and restart#k, so make sure you're ready. Accept, and I'll send you to the test site right away.");
    } else if (status == 8) {
        qm.forceStartQuest(); // Binary source of truth
        qm.warp(910070000, 1);
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
        qm.sendYesNo("Good. These are all the Dark Marbles you need. Are you prepared to become a Crossbowman?");
    } else if (status == 1) {
        if (qm.getQuestStatus(1420) == 1) {
            qm.forceCompleteQuest();
            qm.changeJob(320);
            qm.removeAll(4031013);
        }
        qm.sendNext("Well done, #bCrossbowman#k. Wisdom is your greatest weapon, and with it you can pierce any defense.");
    } else if (status == 2) {
        qm.sendPrev("Crossbowmen must be strong, but you must never use that strength to harm the innocent. Work hard to become a hero of Maple World.");
    } else if (status == 3) {
        qm.dispose();
    }
}