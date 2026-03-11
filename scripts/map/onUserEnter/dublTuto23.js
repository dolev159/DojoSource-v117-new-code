/*
	名字:	維多利亞
	地圖:	鍛煉室3
	描述:	103050530
*/

function start() {
	if (ms.getPlayer().getMap().getMonsterById(9300523) == null) {
		ms.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(9300523), new java.awt.Point(-209, 152));
		}
		ms.dispose();
}