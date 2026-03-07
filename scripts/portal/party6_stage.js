function enter(pi) {
    var mapId = pi.getMapId();
    switch(mapId) {
        case 930000000:
            pi.warp(930000100, 0);
            break;
        case 930000100:
            if (Packages.server.MaplePQManager.checkEllinPQStage1(pi.getPlayer())) {
                pi.warp(930000200, 0);
            } else {
                pi.playerMessage(5, "You must eliminate all the monsters first.");
            }
            break;
        case 930000200:
            if (Packages.server.MaplePQManager.checkEllinPQStage2(pi.getPlayer())) {
                pi.warp(930000300, 0);
                pi.getPlayer().finishAchievement(154);
            } else {
                pi.playerMessage(5, "The spine blocks the way. Purify it first!");
            }
            break;
    }
}