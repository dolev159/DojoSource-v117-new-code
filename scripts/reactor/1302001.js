/*
	名字:	隱藏地圖
	地圖:	雜貨商店後院
	描述:	913070020
*/

function act() {
	rm.dropSingleItem(4033196);
	rm.getPlayer().getMap().getReactorByName("dog").forceHitReactor(rm.getPlayer().getMap().getReactorByName("dog").getState() + 1);
	if (rm.getPlayer().getMap().getReactorByName("dog").getState() > 9) {
		rm.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(9001051), new java.awt.Point(229, 65));
}
}