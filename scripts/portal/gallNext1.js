/*
	名字:	畫中的世界
	地圖:	天空之巢
	描述:	956030200
*/

function enter(pi) {
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(1735)).getStatus() < 1) {
		pi.getClient().getSession().write(Packages.tools.packet.CWvsContext.serverNotice(5, "You cannot enter this area yet. Please talk to Spiegelmann again."));
		return false;
		}
		pi.getPlayer().changeMap(pi.getMap(pi.getPlayer().getMap().getId() + 200), pi.getMap(pi.getPlayer().getMap().getId() + 200).getPortal(2));
		return true;
}