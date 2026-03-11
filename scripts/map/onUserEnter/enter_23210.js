/*
	名字:	隱藏地圖
	地圖:	艾德斯塔公園噴水台附近1
	描述:	931050100
*/

function start() {
	ms.getEventManager("q23210").startInstance(ms.getPlayer());
	ms.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(9001036), new java.awt.Point(873, -14));
	ms.getClient().getSession().write(Packages.tools.packet.CWvsContext.getTopMsg("The rumored monster has appeared, eliminate it."));
	ms.dispose();
}