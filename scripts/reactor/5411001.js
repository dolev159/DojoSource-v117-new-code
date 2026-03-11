/*
	名字:	新加坡
	地圖:	克雷塞爾遺跡 II
	描述:	541020800
*/

function act() {
	rm.getClient().getSession().write(Packages.tools.packet.CField.environmentChange("Bgm09/TimeAttack", 6));
	rm.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(9420520), new java.awt.Point(rm.getReactor().getPosition()));
	rm.getPlayer().getMap().broadcastMessage(Packages.tools.packet.CWvsContext.serverNotice(5, "As you wish, here comes Krexel."));
}