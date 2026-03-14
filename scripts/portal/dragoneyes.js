/*
	名字:	夢中
	地圖:	夢現的森林
	描述:	900010200
*/

function enter(pi) {
	Packages.server.quest.MapleQuest.getInstance(22012).forceStart(pi.getPlayer(), 0, 1);
	return true;
}