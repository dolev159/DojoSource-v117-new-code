function enter(pi) {
    var eim = pi.getPlayer().getEventInstance();
    var target = eim.getMapInstance(922010200);

    if (eim.getProperty("1stageclear") != null) {
        pi.getPlayer().changeMap(target, target.getPortal("st00"));
        return true;
    } else {
        pi.playerMessage("The Portal is still closed");
        return false;
    }
}