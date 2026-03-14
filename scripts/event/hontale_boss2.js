/*
	名字:	生命之穴
	地圖:	試煉之穴Ⅱ
	描述:	240060100
*/

function enter(pi) {
	if (pi.getPlayer().getMap().getReactorByName("tremble2").getState() < 1) {
		pi.getPlayer().getMap().getReactorByName("tremble2").forceHitReactor(1);
		pi.getPlayer().getMap().broadcastMessage(Packages.tools.packet.CWvsContext.serverNotice(6, "A gigantic creature is approaching from the deep cave."));
		pi.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(pi.getPlayer().getMap().getId() == 240060100 ? 8810025 : 8810129), new java.awt.Point(-360, 230));
		}
		return false;
}