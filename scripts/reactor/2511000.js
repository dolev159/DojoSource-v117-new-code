/*
	名字:	隱藏地圖
	地圖:	前往海盜船之路
	描述:	925100000
*/

function act() {
		box = 0;
		for (var i = 1; i < 8; i ++)
	if (rm.getPlayer().getMap().getReactorByName("" + i).getState() < 1) {
		box++;
		}

	if (rm.getPlayer().getMap().getAllMonstersThreadsafe().size() < 1 && box != 0) {
		rm.getPlayer().getMap().startMapEffect("There are" + box + " box(es) that have not been checked yet. Please check the box(es) and eliminate the pirates in hiding.", 5120020);
		}

		for (var i = 0; i < 5; i++)
		rm.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(9300109), new java.awt.Point(rm.getReactor().getPosition()));
		rm.getPlayer().getMap().broadcastMessage(Packages.tools.packet.CWvsContext.serverNotice(5, "Here comes Ginseng Jar, appearing from the box."));
}