/*
	名字:	畫中的世界
	地圖:	峽谷深處
	描述:	956040000
*/

function enter(pi) {
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(1741)).getStatus() < 1) {
		pi.getClient().getSession().write(Packages.tools.packet.CWvsContext.serverNotice(5, "You cannot enter this area yet."));
		return false;
		}
		pi.getPlayer().changeMap(pi.getMap(pi.getPlayer().getMap().getId() + 100), pi.getMap(pi.getPlayer().getMap().getId() + 100).getPortal(0));
		return true;
}