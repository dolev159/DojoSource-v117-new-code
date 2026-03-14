/*
	名字:	奈歐市&amp;lt;2099年&gt;
	地圖:	夜晚的港灣入口
	描述:	240070220
*/

function start() {
	ms.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(7120100), new java.awt.Point(250, 90));
	ms.sendOkS("I feel like a million mesos, just like #p2082004# said! I'm going to knock that monster around this time!", 16);
	ms.getPlayer().startMapTimeLimitTask(1800, ms.getMap(240070000));
	ms.dispose();
}