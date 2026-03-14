/*
	名字:	維多利亞
	地圖:	秘密花園上層
	描述:	103050100
*/

function enter(pi) {
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(2605)).getStatus() == 1) {
		pi.getClient().getSession().write(Packages.tools.packet.CWvsContext.serverNotice(5, "Head left to talk to Ryden."));
		return false;
		}
		pi.getPlayer().changeMap(pi.getMap(103050200), pi.getMap(103050200).getPortal(4));
		return true;
}