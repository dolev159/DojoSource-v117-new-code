/*
	名字:	次元的縫隙
	地圖:	邪惡內面的空地
	描述:	272020300
*/

function start() {
	ms.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(8860003), new java.awt.Point(102, 77));
	ms.dispose();
}