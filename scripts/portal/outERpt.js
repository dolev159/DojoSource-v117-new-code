/*
	名字:	隱密之地
	地圖:	耶雷弗散步步道
	描述:	913050204
*/

function enter(pi) {
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(25442)).getStatus() > 0) {
		pi.getPlayer().changeMap(pi.getMap(130030006), pi.getMap(130030006).getPortal(0)); //小橋樑
		return true;
		}
		pi.getClient().getSession().write(Packages.tools.packet.CWvsContext.serverNotice(5, "You must complete the quest to leave."));
		return false;
}