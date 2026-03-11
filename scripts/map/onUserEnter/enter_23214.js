/*
	名字:	隱藏地圖
	地圖:	其他次元的艾德斯塔公園
	描述:	931050120
*/

function start() {
	ms.getEventManager("q23214").startInstance(ms.getPlayer());
	ms.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(ms.getPlayer().getGender() < 1 ? 9001038 : 9001037), new java.awt.Point(714, -14));
	ms.dispose();
}