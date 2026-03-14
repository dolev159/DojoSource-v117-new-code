/*
	名字:	墮落廣場
	地圖:	墮落廣場站
	描述:	103020020
*/

function enter(pi) {
	pi.getPlayer().changeMap(pi.getMap(103020010), pi.getMap(103020010).getPortal(0));
	pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.getTopMsg("The next stop is at Kerning City Station. The exit is to your left."));
	pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(6, "The next stop is at Kerning City Station. The exit is to your left."));
	pi.getPlayer().startMapTimeLimitTask(10, pi.getMap(103020000));
	return true;
}