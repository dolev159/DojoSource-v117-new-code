function enter(pi) {
    if (Packages.server.MaplePQManager.isStageCleared(pi.getMap(), 6)) {
        pi.warp(pi.getMapId() + 100, "start00");
    } else {
        pi.playerMessage(5, "The portal is closed. You must find the correct path through the teleport boxes.");
    }
}
