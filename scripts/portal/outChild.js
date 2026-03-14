/*
	名字:	黑路
	地圖:	死路森林
	描述:	914000300
*/

function enter(pi) {
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(21001)).getStatus() < 1) {
		pi.getPlayer().changeMap(pi.getMap(914000220), pi.getMap(914000220).getPortal(2)); //燃燒的森林3
		return true;
		}
		pi.getPlayer().changeMap(pi.getMap(914000400), pi.getMap(914000400).getPortal(2)); //燃燒的森林3
		return true;
}