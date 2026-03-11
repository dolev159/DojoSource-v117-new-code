/*
	名字:	獅子王之城
	地圖:	亞尼的禁閉室
	描述:	211061100
*/

function start() {
	ms.dispose();
	ms.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(8210013), new java.awt.Point(717, -580));
}