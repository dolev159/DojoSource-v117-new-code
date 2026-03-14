/*
	名字:	時間神殿
	地圖:	時間裂縫
	描述:	272000000
*/

function enter(pi) {
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(31167)).getStatus() > 0 && pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(31178)).getStatus() < 2) {
		pi.getPlayer().changeMap(pi.getMap(272000100), pi.getMap(272000100).getPortal(1)); //燃燒的神木村1
		return true;
		}
		pi.openNpc(2144017);
		return true;
}