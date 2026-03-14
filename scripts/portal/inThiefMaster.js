/*
	名字:	墮落城市
	地圖:	墮落城市
	描述:	103000000
*/

function enter(pi) {
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(2621)).getStatus() == 1) {
	if (pi.getMap(910350220).getCharacters().size() > 0) {
		pi.getClient().getSession().write(Packages.tools.packet.CWvsContext.serverNotice(5, "Try again soon."));
		return false;
		}
		pi.getPlayer().changeMap(pi.getMap(910350220), pi.getMap(910350220).getPortal(2)); //墮落城市酒吧
		return true;
		}
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(2639)).getStatus() > 0 && pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(2640)).getStatus() < 2) {
		pi.getPlayer().changeMap(pi.getMap(910350230), pi.getMap(910350230).getPortal(2)); //墮落城市酒吧
		return true;
		}
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(2643)).getStatus() == 1) {
	if (pi.getMap(910350240).getCharacters().size() > 0) {
		pi.getClient().getSession().write(Packages.tools.packet.CWvsContext.serverNotice(5, "Try again soon."));
		return false;
		}
		pi.getPlayer().changeMap(pi.getMap(910350240), pi.getMap(910350240).getPortal(2)); //墮落城市酒吧
		return true;
		}
		pi.getPlayer().changeMap(pi.getMap(103000003), pi.getMap(103000003).getPortal(3)); //墮落城市酒吧
		return true;
}