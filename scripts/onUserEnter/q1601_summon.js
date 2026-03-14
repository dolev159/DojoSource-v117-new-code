/*
	名字:	隱藏地圖
	地圖:	維修中的列車
	描述:	931050400
*/

function start() {
	if (ms.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(1601)).getStatus() == 1) {
		for (var i = 0; i < 8; i++)
		ms.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(9300470), new java.awt.Point(-510 + (Math.random() * 600), -5));
		}
		ms.dispose();
}