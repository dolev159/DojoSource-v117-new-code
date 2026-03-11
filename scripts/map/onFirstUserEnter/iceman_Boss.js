/*
	名字:	冰雪平原
	地圖:	受冰詛咒的平原
	描述:	932000300
*/

function start() {
	//ms.spawnNPCRequestController(2159021, -380, 154, 1);
	ms.getPlayer().getMap().startMapEffect("The Ice Knight has appeared! Please eliminate him, and break my curse!", 5120051);
	ms.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(9300442), new java.awt.Point(211, 154));
	ms.dispose();
}