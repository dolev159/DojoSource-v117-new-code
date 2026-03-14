/*
    Name: 聖魂劍士之路 (The Path of a Dawn Warrior)
    Map: 耶雷弗 (Ereve)
    ID: 20101
    Nexus Omni v117 Standard
*/

var status = -1;

function end(mode, type, selection) {
    if (mode == -1) {
        qm.dispose();
        return;
    }
    if (mode == 0 && status == 0) {
        qm.sendNext("Make your decision carefully.");
        qm.dispose();
        return;
    }
    if (mode == 1) status++; else status--;

    if (status == 0) {
        if (qm.getQuestStatus(20101) == 0) {
            qm.forceStartQuest(20101);
            qm.dispose();
            return;
        }
        qm.sendYesNo("Have you made your decision? The decision will be final, so think carefully before deciding what to do. Are you sure you want to become the Dawn Warrior?");
    } else if (status == 1) {
        if (qm.getQuestStatus(20101) == 1) {
            qm.changeJob(1100);
            qm.resetStats(35, 4, 4, 4);
            qm.expandInventory(1, 4); // EQUIP
            qm.expandInventory(4, 4); // ETC
            qm.gainItem(1302077, 1);
            qm.gainItem(1142066, 1);
            qm.getPlayer().gainSP(1, 0); // Sp for 1st job
            qm.teachSkill(10009000, 1, 1); // Pig's Weakness
            qm.topMsg("You learned the Pig's Weakness Skill.");
            qm.forceCompleteQuest(20101);
        }
        qm.sendNext("I have just molded your body to be perfect for a Dawn Warrior. If you wish to become more powerful, use the Stat window (S) to raise the appropriate stats. If you aren't sure what to raise, just click on #bAuto#k.");
    } else if (status == 2) {
        qm.sendNextPrev("I have also expanded your inventory slot counts for your Equip and ETC tabs. Use those slots wisely and fill them up with items required for Knights to carry.");
    } else if (status == 3) {
        qm.sendNextPrev("I have also given you a hint of #bSP#k, so open the #bSkill Menu#k to acquire new skills. Of course, you can't raise them all at once, and there are some skills out there you won't be able to acquire unless you master the basic skills first.");
    } else if (status == 4) {
        qm.sendNextPrev("Unlike your time as a Nobless, once you become the Soul Master, you will lose a portion of your EXP when you run out of HP, okay?");
    } else if (status == 5) {
        qm.sendNextPrev("Now, I want you to go out there and show the world what the Cygnus Knights are made of.");
    } else if (status == 6) {
        qm.dispose();
    }
}