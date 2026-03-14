/*
	名字:	獅子王城
	地圖:	第二座塔
	描述:	211060400
*/

function enter(pi) {
	if (pi.getPlayer().itemQuantity(4032833)) {
	if (pi.getMap(211060401).getCharacters().size() < 1) {
		var em = pi.getEventManager("q3140");
		em.startInstance(pi.getPlayer());
		return true;
		}
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "Try again soon."));
		return false;
		}
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "You can't get to the roof of the tower without a key."));
		return false;
}