/*
	名字:	黑暗時間神殿
	地圖:	黑魔法師的房前徊廊
	描述:	272010200
*/

function start() {
	if (ms.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(31178)).getMobKills(8860001) > 0) {
		ms.getPlayer().getMap().spawnNpc(2144000, new java.awt.Point(-100, 71));
		ms.dispose();
		return;
		}
		ms.dispose();
		ms.spawnNPCRequestController(2144019, 782, 8, 1);
		ms.openNpc(2144019);
}