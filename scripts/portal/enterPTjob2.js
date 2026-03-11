/*
	名字:	隱密之地
	地圖:	天空之城寶物倉庫入口
	描述:	915010000
*/

function enter(pi) {
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(25101)).getStatus() < 1) {
		pi.getClient().getSession().write(Packages.tools.packet.CWvsContext.serverNotice(5, "You can only enter while doing the quest."));
		return false;
		}
	if (pi.getPlayer().getMap().getAllMonstersThreadsafe().size() > 0) {
		pi.getClient().getSession().write(Packages.tools.packet.CWvsContext.serverNotice(5, "You must break the lock first."));
		return false;
		}
		pi.getPlayer().changeMap(pi.getMap(915010001), pi.getMap(915010001).getPortal(1)); //天空之城寶物倉庫
		return true;
}