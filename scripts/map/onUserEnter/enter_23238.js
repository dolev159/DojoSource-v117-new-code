/*
	名字:	隱藏地圖
	地圖:	訓練房的參股
	描述:	931050200
*/

function start() {
	ms.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(9300456), new java.awt.Point(400, -4));
	ms.dispose();
}