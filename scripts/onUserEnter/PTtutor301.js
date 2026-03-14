/*
	名字:	耶雷弗
	地圖:	騎士之殿
	描述:	915000301
*/

function start() {
	if (ms.getPlayer().getMap().getAllMonstersThreadsafe().size() < 1) {
		ms.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(9300498), new java.awt.Point(-2070, -718));
		ms.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(9300507), new java.awt.Point(-2070, -477));
		ms.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(9300498), new java.awt.Point(-2430, -211));
		}
		ms.dispose();
}