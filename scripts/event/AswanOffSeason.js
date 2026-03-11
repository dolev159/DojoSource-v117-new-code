var Random = Java.type("java.util.Random");
var rand = new Random();

function init() {
}

function setup() {
    var name;
    do {
        name = "AswanOffSeason" + rand.nextInt(999999);
    } while (em.getInstance(name) != null);

    var eim = em.newInstance(name);
    eim.setProperty("Global_StartMap", "955000100");
    eim.setProperty("Global_ExitMap", "262000000");
    eim.setProperty("Global_MinPerson", "1");
    eim.setProperty("CurrentStage", "1");
    return eim;
}

function playerEntry(eim, player) {
    var mapId = parseInt(eim.getProperty("Global_StartMap"));
    var map = eim.getMapFactory().getMap(mapId);
    player.changeMap(map, map.getPortal("sp"));
    player.dropMessage(6, "[Hilla's Gang Liberation] Watch out, they are powerful!");
}

function changedMap(eim, player, mapid) {
    if (mapid !== 955000100 && mapid !== 955000200 && mapid !== 955000300) {
        eim.unregisterPlayer(player);
    }
}

function scheduledTimeout(eim) {
    var exitMapId = parseInt(eim.getProperty("Global_ExitMap"));
    var exit = em.getChannelServer().getMapFactory().getMap(exitMapId);
    var it = eim.getPlayers().iterator();
    while (it.hasNext()) {
        var chr = it.next();
        if (chr != null) {
            chr.changeMap(exit, exit.getPortal("sp"));
            chr.dropMessage(6, "[Hilla's Gang Liberation] You have failed to defeat her gang in the time limit.");
        }
    }
    eim.unregisterAll();
    eim.dispose();
}

function allMonstersDead(eim) {
    var startMapId = parseInt(eim.getProperty("Global_StartMap"));
    var stage = parseInt(eim.getProperty("CurrentStage"));
    var curMapId = startMapId + ((stage - 1) * 100);
    var map = eim.getMapFactory().getMap(curMapId);
    if (curMapId === 955000300) {
        eim.broadcastPlayerMsg(6, "[Hilla's Gang Liberation] Enter the portal to claim your reward!");
    } else {
        eim.setProperty("CurrentStage", (stage + 1).toString());
        eim.broadcastPlayerMsg(6, "[Hilla's Gang Liberation] Please enter the portal to proceed.");
    }

    eim.broadcastPacket(EtcPacket.showEffect("aswan/clear"));
    eim.broadcastPacket(MaplePacketCreator.enableActions());
}

function playerDead(eim, player) {
    return 0;
}

function playerRevive(eim, player) {
    player.dropMessage(5, "[Hilla] You are weak! You will never defeat me!!");
    player.addHP(50);
    var map = eim.getMapFactory().getMap(player.getMapId());
    player.changeMap(map, map.getPortal(0));
    return true;
}

function playerDisconnected(eim, player) {
    if (eim.getProperty("Global_MinPerson") == null) {
        return -1;
    }
    return -parseInt(eim.getProperty("Global_MinPerson"));
}

function monsterValue(eim, mobid) {
    return 1;
}

function leftParty(eim, player) {
    if (eim.getPlayerCount() < parseInt(eim.getProperty("Global_MinPerson"))) {
        var exit = em.getChannelServer().getMapFactory().getMap(parseInt(eim.getProperty("Global_ExitMap")));
        var it = eim.getPlayers().iterator();
        while (it.hasNext()) {
            var chr = it.next();
            chr.changeMap(exit, exit.getPortal(0));
        }
        eim.unregisterAll();
        eim.dispose();
    }
}

function disbandParty(eim) {
    var exit = em.getChannelServer().getMapFactory().getMap(parseInt(eim.getProperty("Global_ExitMap")));
    var it = eim.getPlayers().iterator();
    while (it.hasNext()) {
        var chr = it.next();
        chr.changeMap(exit, exit.getPortal(0));
    }
    eim.unregisterAll();
    eim.dispose();
}

function clearPQ(eim) {
}

function playerExit(eim, player) {
    var exit = em.getChannelServer().getMapFactory().getMap(parseInt(eim.getProperty("Global_ExitMap")));
    player.changeMap(exit, exit.getPortal(0));
    eim.unregisterPlayer(player);
    if (eim.getPlayerCount() <= 0) {
        eim.dispose();
    }
}

function onMapLoad(eim, player) {
}

function cancelSchedule(eim) {
}
