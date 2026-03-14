/*
	名字:	維多利亞
	地圖:	起點
	描述:	103050900
*/

function enter(pi) {
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(2600)).getStatus() < 1) {
		pi.getClient().getSession().write(Packages.tools.packet.CWvsContext.getTopMsg("Talk to Ryden first, and then start your journey."));
		return false;
		}
		pi.getPlayer().changeMap(pi.getMap(103050910), pi.getMap(103050910).getPortal(0));
		return true;
}