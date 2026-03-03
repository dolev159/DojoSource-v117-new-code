function enter(pi) {
    var eim = pi.getPlayer().getEventInstance();
    var target = eim.getMapInstance(922010300);

    if (eim.getProperty("1stageclear") != null) {
        pi.getPlayer().changeMap(target, target.getPortal("st00"));
        return true;
    }
}