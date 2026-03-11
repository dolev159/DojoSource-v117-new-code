/*
	名字:	天空之城
	地圖:	天空之城塔&amp;lt;5層&gt;
	描述:	200081700
*/

function enter(pi) {
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(25429)).getStatus() == 1) {
	if (pi.getMap(920030100).getCharacters().size() < 1) {
		pi.getMap(920030100).resetFully();
		pi.getPlayer().changeMap(pi.getMap(920030100), pi.getMap(920030100).getPortal(1)); //亞凱斯特的研究室
		return true;
		}
		pi.getClient().getSession().write(Packages.tools.packet.CWvsContext.serverNotice(5, "Try again soon."));
		return false;
		}
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(25430)).getStatus() == 1) {
	if (pi.getMap(920030101).getCharacters().size() < 1) {
		pi.getMap(920030101).resetFully();
		pi.getPlayer().changeMap(pi.getMap(920030101), pi.getMap(920030101).getPortal(1)); //亞凱斯特的研究室
		return true;
		}
		pi.getClient().getSession().write(Packages.tools.packet.CWvsContext.serverNotice(5, "Try again soon."));
		return false;
		}
		return false;
}