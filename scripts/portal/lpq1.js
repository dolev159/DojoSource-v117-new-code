function enter(pi) {
    if (server.MaplePQManager.isStageCleared(pi.getMap(), 1)) {
        pi.warp(pi.getMapId() + 100, "st00");
    } else {
        pi.playerMessage(5, "The portal is blocked.");
    }
}