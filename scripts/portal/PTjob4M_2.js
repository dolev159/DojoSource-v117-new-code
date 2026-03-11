/*
	名字:	隱密之地
	地圖:	神木村寶物倉庫入口
	描述:	915010200
*/

function enter(pi) {
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(25122)).getStatus() < 1) {
		pi.getClient().getSession().write(Packages.tools.packet.CWvsContext.serverNotice(5, "You must complete the quest to enter."));
		return false;
		}
		pi.getPlayer().changeMap(pi.getMap(915010201), pi.getMap(915010201).getPortal(1)); //神木村寶物倉庫
		return true;
}