/*
	名字:	隱藏地圖
	地圖:	沼地小屋
	描述:	910350210
*/

function start() {
	for (var i = 0; i < 7; i++)
	ms.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(9300525), new java.awt.Point(-100 + (Math.random() * 350), 155));
	ms.dispose();
}