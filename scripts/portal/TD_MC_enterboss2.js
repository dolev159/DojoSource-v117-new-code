/*
	名字:	菇菇王國
	地圖:	最後城塔
	描述:	106021402
*/

function enter(pi) {
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(2333)).getStatus() > 1) {
		pi.getPlayer().changeMap(pi.getMap(106021700), pi.getMap(106021700).getPortal(1));
		return true;
		}
		pi.openNpc(1300013);
		return true;
}