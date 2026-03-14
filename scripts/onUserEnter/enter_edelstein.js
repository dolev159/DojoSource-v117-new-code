/*
	名字:	黑色翅膀佔領地
	地圖:	埃德爾斯坦
	描述:	310000000
*/

function start() {
	if (Math.floor(ms.getPlayer().getJob() / 100 % 100) == 24) {
		Packages.server.quest.MapleQuest.getInstance(25443).forceStart(ms.getPlayer(), 0, 1);
		}
		ms.dispose();
}