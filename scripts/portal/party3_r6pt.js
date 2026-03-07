function enter(pi) {
    try {
        var portalName = pi.getPortal().getName();
        if (Packages.server.MaplePQManager.checkOrbisPQTeleport(pi.getPlayer(), portalName)) {
            pi.warpS(pi.getMapId(), (portalName.startsWith("rp08") ? 2 : (pi.getPortal().getId() + 4)));
            pi.playerMessage(-1, "Correct combination!");
        } else {
            pi.warpS(pi.getMapId(), (portalName.startsWith("rp01") ? 5 : (portalName.startsWith("rp05") ? 1 : (pi.getPortal().getId() - 4))));
            pi.playerMessage(-1, "Incorrect combination.");
        }
    } catch (e) {
        pi.getPlayer().dropMessage(5, "Error: " + e);
    }
}