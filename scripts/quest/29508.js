/*
    Name: 優秀社會人士 (Outstanding Citizen)
    Map: 維多利亞港 (Lith Harbor)
    ID: 29508
    Nexus Omni v117 Standard
*/

var status = -1;

function end(mode, type, selection) {
    if (mode == -1) {
        qm.dispose();
        return;
    }
    if (mode == 1) status++; else status--;

    if (status == 0) {
        if (qm.getQuestStatus(29508) == 0) { // Not Started
            qm.forceStartQuest(29508);
            qm.dispose();
            return;
        }

        var chr = qm.getPlayer();
        var marriage = chr.getMarriageId() > 0;
        var guild = chr.getGuildId() > 0;
        var junior = chr.getJunior1() > 0;

        if (!marriage || !guild || !junior) {
            var msg = "\r\n";
            msg += "- Wedding " + (marriage ? "#b(Completion)#k" : "#r(Before Completion)#k") + "\r\n";
            msg += "- Join a Guild " + (guild ? "#b(Completion)#k" : "#r(Before Completion)#k") + "\r\n";
            msg += "- Get a Junior " + (junior ? "#b(Completion)#k" : "#r(Before Completion)#k") + "\r\n";
            msg += "\r\nYou still lack some qualities that make up an #bOutstanding Citizen#k. Come back when you're ready.";
            qm.sendOk(msg);
            qm.dispose();
            return;
        }

        if (qm.getInventory(1).getNumFreeSlot() < 1) { // 1 = EQUIP
            qm.sendOk("Talk to me after you make room in the Equip window of your Item Inventory.");
            qm.dispose();
            return;
        }

        // Apply completion
        qm.forceCompleteQuest(29508);
        qm.gainItem(1142081, 1);
        qm.sendNext("\n- Wedding #b(Completion)#k\r\n\n- Join a Guild #b(Completion)#k\r\n\n- Get a Junior #b(Completion)#k \r\nYou are now an Outstanding Citizen. Continue to stay active in the community.");
    } else if (status == 1) {
        qm.dispose();
    }
}