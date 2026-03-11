/*
	名字:	墮落城市
	地圖:	墮落城市
	描述:	103000000
*/

function enter(pi) {
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(2614)).getStatus() == 1) {
	if (pi.getMap(910350200).getCharacters().size() < 1) {
		pi.getMap(910350200).resetFully();
		pi.getPlayer().changeMap(pi.getMap(910350200), pi.getMap(910350200).getPortal(1)); //藥店
		return true;
		}
		pi.getClient().getSession().write(Packages.tools.packet.CWvsContext.serverNotice(5, "Try again soon."));
		return false;
		}
		pi.getPlayer().changeMap(pi.getMap(103000002), pi.getMap(103000002).getPortal(8)); //藥店
		return true;
}