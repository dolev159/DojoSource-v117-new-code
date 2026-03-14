/*
	名字:	瑞恩島
	地圖:	冰雪平原
	描述:	140010200
*/

function enter(pi) {
	if ((pi.getPlayer().getJob() == 2000 || pi.getPlayer().getJob() == 2100) && pi.getPlayer().getLevel() < 20) {
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "Anyone who has no business entering the Mirror Cave will be denied access."));
		return false;
		}
		pi.getPlayer().changeMap(pi.getMap(140030000), pi.getMap(140030000).getPortal(1)); //镜洞
		return true;
}