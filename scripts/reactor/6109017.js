function act() {
    var em = rm.getEventManager("CWKPQ");
    if (em != null) {
        if (Packages.server.MaplePQManager.canActivateSigil(rm.getPlayer(), 6109017)) {
            rm.mapMessage(6, "The Archer Sigil has been activated!");
            em.setProperty("glpq4", parseInt(em.getProperty("glpq4")) + 1);
            if (em.getProperty("glpq4").equals("5")) {
                rm.mapMessage(6, "The Antellion grants you access to the next portal! Proceed!");
                rm.getMap().changeEnvironment("4pt", 2);
            }
        } else {
            rm.playerMessage(5, "Only an Archer may activate this sigil.");
        }
    }
}