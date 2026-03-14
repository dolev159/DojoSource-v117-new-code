/*
	名字:	怪物公園
	地圖:	怪物公園
	描述:	951000000
*/

function enter(pi) {
	Packages.server.quest.MapleQuest.getInstance(71004).forceStart(pi.getPlayer(), 0, 5);
	pi.openNpc(9071004);
	return true;
}