/*
	名字:	黑暗耶雷弗
	地圖:	耶雷弗岔路
	描述:	271000300
*/

function enter(pi) {
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(31125)).getStatus() > 1) {
		pi.getPlayer().changeMap(pi.getMap(271030000), pi.getMap(271030000).getPortal(1)); //要塞入口
		return true;
		}
		pi.getPlayer().changeMap(pi.getMap(271030010), pi.getMap(271030010).getPortal(1));
		return true;
}