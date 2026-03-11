/*
	名字:	隱密之地
	地圖:	天空之城寶物倉庫入口
	描述:	915010000
*/

function start() {
	if (ms.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(25101)).getStatus() < 1) {
		ms.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(9001045), new java.awt.Point(170, 182));
		}
		Packages.server.quest.MapleQuest.getInstance(25102).forceStart(ms.getPlayer(), 0, 1);
		ms.dispose();
}