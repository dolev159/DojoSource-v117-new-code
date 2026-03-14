/*
	名字:	獅子王城
	地圖:	第三座塔
	描述:	211060600
*/

function enter(pi) {
	if (pi.getPlayer().itemQuantity(4032834)) {
	if (pi.getMap(211060601).getCharacters().size() < 1) {
		var em = pi.getEventManager("q3141");
		em.startInstance(pi.getPlayer());
		return true;
		}
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "Try again soon."));
		return false;
		}
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "You can't get to the roof of the tower without a key."));
		return false;
}