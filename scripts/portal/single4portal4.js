/*
	名字:	畫中的世界
	地圖:	聞味的狼
	描述:	956040400
*/

function enter(pi) {
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(1745)).getStatus() < 2) {
		pi.getPlayer().changeMap(pi.getMap(pi.getPlayer().getMap().getId() - 100), pi.getMap(pi.getPlayer().getMap().getId() - 100).getPortal(1));
		return true;
		}
		pi.getPlayer().changeMap(pi.getMap(pi.getPlayer().getMap().getId() + 100), pi.getMap(pi.getPlayer().getMap().getId() + 100).getPortal(1));
		return true;
}