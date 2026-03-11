/*
	名字:	維多利亞
	地圖:	秘密花園上層
	描述:	103050100
*/

function enter(pi) {
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(2605)).getStatus() > 0) {
		pi.getPlayer().changeMap(pi.getMap(103050500), pi.getMap(103050500).getPortal(4)); //秘密修煉室入口
		return true;
		}
		pi.getClient().getSession().write(Packages.tools.packet.CWvsContext.serverNotice(5, "You don't need to enter this training area."));
		return false;
}