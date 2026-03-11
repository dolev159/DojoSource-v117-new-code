/*
	名字:	墮落城市
	地圖:	藥店
	描述:	910350200
*/

function start() {
	for (var i = 0; i < 16; i++)
	ms.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(9300524), new java.awt.Point(-250 + (Math.random() * 250), 150));
	ms.dispose();
}