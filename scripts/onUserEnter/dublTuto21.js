/*
	名字:	維多利亞
	地圖:	鍛煉室1
	描述:	103050510
*/

function start() {
	ms.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(9300521), new java.awt.Point(-500, 152));
	ms.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(9300522), new java.awt.Point(-300, 152));
	ms.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(9300522), new java.awt.Point(-100, 152));
	ms.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(9300522), new java.awt.Point(100, 152));
	ms.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(9300522), new java.awt.Point(300, 152));
	ms.dispose();
}