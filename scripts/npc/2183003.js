var Calendar = Java.type("java.util.Calendar");
var StringUtil = Java.type("tools.StringUtil");

var status = -1;
var partymembers;

function start() {
    partymembers = cm.getPartyMembers();
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1 || mode == 0) {
        cm.dispose();
        return;
    }

    if (mode == 1) {
        status++;
    }

    if (status == 0) {
        var cal = Calendar.getInstance();
        var year = cal.get(Calendar.YEAR) % 100;
        var month = StringUtil.getLeftPaddedStr((cal.get(Calendar.MONTH) + 1) + "", "0", 2);
        var day = StringUtil.getLeftPaddedStr(cal.get(Calendar.DAY_OF_MONTH) + "", "0", 2);
        var today = year + "/" + month + "/" + day;

        if (cm.getPlayer().getKeyValue("AswanOffSeason_LastDate") == null) {
            cm.getPlayer().setKeyValue("AswanOffSeason_LastDate", today);
        }

        if (cm.getQuestStatus(7963) == 0 || !cm.getPlayer().getKeyValue("AswanOffSeason_LastDate").equals(today)) {
            cm.forceStartQuest(7963, "0");
            cm.getPlayer().setKeyValue("AswanOffSeason_LastDate", today);
        }

        var entries = 0;
        try {
            entries = Integer.parseInt(cm.getQuestCustomData(7963));
        } catch (e) {
            entries = 0;
        }

        cm.sendSimple(
            "#e<Fight for Azwan> #n\r\n\r\nJoin in the Fight for Azwan? #e(Can enter 10 times a day)#n#b\n\r\n" +
            "#L0#Take down Hilla. (Lv. 120 and above)#l\r\n" +
            "#L1#Enter the Fight for Azwan (Remaining entries: #r" + (10 - entries) + "#k)#l"
        );
    } else if (status == 1) {
        if (selection == 1) {
            if (
                cm.getMap(955000100).getCharactersSize() >= 1 ||
                cm.getMap(955000200).getCharactersSize() >= 1 ||
                cm.getMap(955000300).getCharactersSize() >= 1
            ) {
                cm.sendNext("Another party has already entered the #rFight for Azwan#k.\r\nPlease try another channel, or wait for the current party to finish.");
                cm.dispose();
                return;
            }

            var entries = 0;
            try {
                entries = Integer.parseInt(cm.getQuestCustomData(7963));
            } catch (e) {
                entries = 0;
            }

            if (entries >= 10) {
                cm.sendOk("You've already participated #e10 times#n today.\r\nPlease come back tomorrow.");
                cm.dispose();
                return;
            }

            if (!checkLevel(cm.getPlayer().getLevel(), 40, 255)) {
                cm.sendOk("You must be at least level 40 to enter.");
                cm.dispose();
                return;
            }

            var em = cm.getEventManager("AswanOffSeason");
            if (em == null) {
                cm.sendOk("The event script for Azwan is missing.");
                cm.dispose();
                return;
            }

            var prop = em.getProperty("state");
            if (prop == null || prop.equals("0")) {
                em.startInstance(cm.getParty(), cm.getMap(), 120);
                cm.prepareAswanMob(955000100, em);
                cm.forceStartQuest(7963, (entries + 1) + "");
                cm.dispose();
                return;
            } else {
                cm.sendOk("Another party has already entered the #rFight for Azwan#k.\r\nPlease try another channel or wait.");
                cm.dispose();
            }

        } else if (selection == 0) {
            if (cm.getPlayer().getParty() == null) {
                cm.sendOk("You must be in a party to continue.");
            } else {
                cm.warp(262030000, 0);
            }
            cm.dispose();
        }
    }
}

function checkLevel(cur, min, max) {
    return (cur >= min && cur <= max);
}
