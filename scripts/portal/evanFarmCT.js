/*
	名字:	潘姆之路
	地圖:	農場中心地
	描述:	100030300
*/

function enter(pi) {
	if ((pi.getPlayer().getJob() == 2001 || pi.getPlayer().getJob() == 2210) && pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(22010)).getStatus() < 1) {
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "I have no business on the Large Forest Trail."));
		return false;
		}
		pi.getPlayer().changeMap(pi.getMap(100030310), pi.getMap(100030310).getPortal(3)); //大路1
		return true;
}