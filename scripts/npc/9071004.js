var maps = Array(952020000, 952030000, 952040000, 953000000, 953010000, 953020000, 953030000, 953040000, 953050000, 954000000, 954010000, 954020000, 954030000, 954040000, 954050000);
var minLevel = Array(1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1);
var maxLevel = Array(250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250);

function start() {
    var selStr = "Which dungeon would you like to enter?\r\n\r\n#b";
    for (var i = 0; i < maps.length; i++) {
	selStr += "#L" + i + "##m" + maps[i] + "# (Monsters Lv." + minLevel[i] + " - " + maxLevel[i] + ")#l\r\n";
    }
    cm.sendSimple(selStr);
}

function action(mode, type, selection) {
    if (mode == 1 && selection >= 0 && selection < maps.length) {
        if (cm.getParty() == null || !cm.isLeader()) {
            cm.sendOk("Please get your leader to walk through.");
        } else {
            if (Packages.server.MaplePQManager.canEnter(cm.getPlayer(), Packages.server.MaplePQManager.PQType.MONSTER_PARK)) {
                var em = cm.getEventManager("MonsterPark");
                if (em == null || em.getInstance("MonsterPark" + maps[selection]) != null) {
                    cm.sendOk("Someone is already attempting Monster Park.");
                } else {
                    em.startInstance_Party("" + maps[selection], cm.getPlayer());
                }
            }
        }
    }
    cm.dispose();
}