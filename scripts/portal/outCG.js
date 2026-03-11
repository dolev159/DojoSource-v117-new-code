/*
	名字:	水晶花園
	地圖:	水晶花園
	描述:	150000000
*/

function enter(pi) {
	num = pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(25010)).getCustomData() < 100000000 ? 104020100 : pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(25010)).getCustomData();
	pi.getPlayer().changeMap(pi.getMap(num), pi.getMap(num).getPortal(0));
	return true;
}