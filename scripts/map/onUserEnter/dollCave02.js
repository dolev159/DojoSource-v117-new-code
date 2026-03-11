/*
	名字:	隱藏地圖
	地圖:	傀儡師洞窟
	描述:	910510202
*/

function start() {
	ms.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(9300346), new java.awt.Point(205, 257));
	ms.dispose();
}