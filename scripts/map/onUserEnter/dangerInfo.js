/*
	名字:	隱藏地圖
	地圖:	危險的資料商店
	描述:	910400000
*/

function start() {
	ms.getPlayer().getMap().spawnNpc(1204003, new java.awt.Point(90, 120));
	ms.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(9300382), new java.awt.Point(213, 120));
	ms.dispose();
}