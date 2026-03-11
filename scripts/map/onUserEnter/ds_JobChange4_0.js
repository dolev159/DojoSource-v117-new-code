/*
	名字:	隱藏地圖
	地圖:	過去的時間神殿1
	描述:	927000100
*/

function start() {
	ms.getEventManager("q23215").startInstance(ms.getPlayer());
	ms.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(ms.getPlayer().getGender() < 1 ? 9001039 : 9001040), new java.awt.Point(500, 44));
	ms.dispose();
}