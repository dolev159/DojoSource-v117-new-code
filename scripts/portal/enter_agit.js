/*
	名字:	天上的克里塞
	地圖:	克里塞路口
	描述:	200100000
*/

function enter(pi) {
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(31001)).getStatus() < 2) {
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "An outsider cannot enter here."));
		return false;
		}
		pi.getPlayer().changeMap(pi.getMap(200100010), pi.getMap(200100010).getPortal(1)); //克里塞基地
		return true;
}