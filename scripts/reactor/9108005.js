/*
	名字:	隱藏地圖
	地圖:	迎月花山丘
	描述:	910010000
*/

function act() {
	rm.getPlayer().getMap().getReactorByName("fullmoon").forceHitReactor(rm.getPlayer().getMap().getReactorByName("fullmoon").getState() + 1);
	if (rm.getPlayer().getMap().getReactorByName("fullmoon").getState() > 5) {
		rm.getPlayer().getMap().startMapEffect("Protect the Moon Bunny, and gather 10 Moon Bunny's Rice Cakes for me!", 5120016);
		rm.getPlayer().getMap().broadcastMessage(Packages.tools.packet.CWvsContext.serverNotice(5, "Protect the Moon Bunny!!!"));
		rm.getPlayer().getMap().setSpawns(true);
		rm.getPlayer().getMap().respawn(true);
		rm.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(9300061), new java.awt.Point(-183, -433));
}
}