/*
	名字:	生命之穴
	地圖:	試煉之穴Ⅰ
	描述:	240060000
*/

function enter(pi) {
	if (pi.getPlayer().getMap().getReactorByName("tremble1").getState() < 1) {
		pi.getPlayer().getMap().getReactorByName("tremble1").forceHitReactor(1);
		pi.getPlayer().getMap().broadcastMessage(Packages.tools.packet.CWvsContext.serverNotice(6, "A gigantic creature is approaching from the deep cave."));
		pi.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(pi.getPlayer().getMap().getId() == 240060000 ? 8810024 : 8810128), new java.awt.Point(890, 230));
		}
		return false;
}