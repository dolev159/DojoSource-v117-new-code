/*
	名字:	隱藏地圖
	地圖:	空中監獄
	描述:	921160600
*/

function act() {
	rm.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(9300452), new java.awt.Point(rm.getReactor().getPosition()));

	rm.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(9300453), new java.awt.Point(rm.getReactor().getPosition()));

	rm.getPlayer().getMap().getReactorById(9219000).forceHitReactor(rm.getPlayer().getMap().getReactorById(9219000).getState() + 1);

	if (rm.getPlayer().getMap().getReactorById(9219000).getState() > 3) {
		rm.getPlayer().getMap().broadcastMessage(Packages.tools.packet.CField.environmentChange("quest/party/clear", 3));
		rm.getPlayer().getMap().broadcastMessage(Packages.tools.packet.CField.environmentChange("Party1/Clear", 4));
		rm.getPlayer().getMap().broadcastMessage(Packages.tools.packet.CWvsContext.serverNotice(5, "All the cell doors are open."));
		rm.getPlayer().getMap().startMapEffect("Whew. Thanks to you, I've finally escaped this prison.", 5120053);
		rm.getPlayer().getMap().spawnNpc(9020006, new java.awt.Point(2800, -140));
		rm.getPlayer().getMap().killAllMonsters(true);
		rm.getPlayer().getMap().setSpawns(false);
}
}

//4001528	監獄鑰匙