/*
	名字:	獅子王城
	地圖:	城牆下4
	描述:	211060700
*/

function enter(pi) {
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(3141)).getStatus() > 1) {
		pi.getPlayer().changeMap(pi.getMap(211060800), pi.getMap(211060800).getPortal(1)); //第四座塔
		return true;
		}
		pi.openNpc(2161002);
		return true;
}