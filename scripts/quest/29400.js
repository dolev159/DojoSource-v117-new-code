/*
    Name: 精明的獵人 (Veteran Hunter)
    Map: 維多利亞港 (Lith Harbor)
    ID: 29400
    Nexus Omni v117 Standard
*/

var status = -1;
var select = -1;

function start(mode, type, selection) {
    if (mode == -1) {
        qm.dispose();
        return;
    }
    if (mode == 0 && status == 0) {
        qm.sendNext("Come back when you're ready.");
        qm.dispose();
        return;
    }
    if (mode == 1) status++; else status--;

    if (status == 0) {
        qm.sendAcceptDecline("#v1142004# #e#b#t1142004##k\r\n\r\n-Time Limit 30 Days\r\n-Hunt 100,000 Monsters#n\r\n\r\n*Only monsters that are at your level or higher are approved. \r\n\r\nDo you want to test your skills to see if you're worthy of this title?");
    } else if (status == 1) {
        qm.sendNext("I'll give you 30 days to reach your hunting goal. Once you are finished, come back and see me. Remember, you have to come back and see me within the time limit in order to be approved. Also, you are prohibited from trying out for another title unless you first complete or forfeit this challenge.");
    } else if (status == 2) {
        qm.forceStartQuest(29400, "0");
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
        var kills = parseInt(qm.getQuestCustomData(29400));
        var msg = "The number of monsters you hunted is " + kills + " and the goal is 100,000. What would you like to do?";
        if (kills >= 100000) {
            msg += "\r\n#L0##bl want to receive the regular medal.#l";
        }
        msg += "\r\n#L1##bl want to forfeit the challenge.#l";
        qm.sendSimple(msg);
    } else if (status == 1) {
        select = selection;
        if (select == 0) {
            qm.sendAcceptDecline("You hunted 100,000 monsters... You've reached your goal. What an amazing accomplishment. Do you wish to receive the #b#eVeteran Hunter Medal#n#k?");
        } else if (select == 1) {
            qm.sendAcceptDecline("You don't want to try anymore? If you want to go for another title quest, you have to quit this quest first.");
        }
    } else if (status == 2) {
        if (select == 1) {
            qm.forfeitQuest(29400);
            qm.dispose();
            return;
        }
        if (qm.getInventory(1).getNumFreeSlot() < 1) {
            qm.sendOk("Make sure you have enough space in the Equip window of your Item Inventory.");
            qm.dispose();
            return;
        }
        qm.sendNext("On behalf of the God of Honor, I, Dalair, declare you as the newest owner of this honorable title. If you want to try out for another title, come back and see me anytime.");
    } else if (status == 3) {
        qm.forceCompleteQuest(29400);
        qm.topMsg("Veteran Hunter Medal obtained.");
        qm.gainItem(1142004, 1, 30); // 30 day limit if handled by gainItem
        qm.dispose();
    }
}