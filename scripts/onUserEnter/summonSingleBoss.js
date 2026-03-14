/*
	名字:	畫中的世界
	地圖:	熄燈藝廊
	描述:	956050000
*/

function start() {
	ms.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(9810000), new java.awt.Point(0, 98));
	ms.dispose();
}