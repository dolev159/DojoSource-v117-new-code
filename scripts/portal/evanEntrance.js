/*
	名字:	潘姆之路
	地圖:	大路2
	描述:	100030320
*/

function enter(pi) {
	if ((pi.getPlayer().getJob() == 2001 || pi.getPlayer().getJob() == 2210) && pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(22510)).getStatus() < 1) {
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "I don't see a reason to leave the farm."));
		return false;
		}
		pi.getPlayer().changeMap(pi.getMap(100030400), pi.getMap(100030400).getPortal(1)); //農場入口
		return true;
}