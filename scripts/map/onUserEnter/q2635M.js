/*
	名字:	隱藏地圖
	地圖:	武英的倉庫
	描述:	910510700
*/

function start() {
	for (var i = 0; i < 12; i++)
	ms.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(9300527), new java.awt.Point((Math.random() * 200), 190));
	ms.dispose();
}