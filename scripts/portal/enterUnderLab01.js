/*
	名字:	隱藏地圖
	地圖:	傑利麥勒實驗室入口
	描述:	931050600
*/

function enter(pi) {
	if (pi.getPlayer().getMap().getAllMonstersThreadsafe().size() < 10) {
		for (var i = 0; i < 20; i++)
		pi.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(9300493), new java.awt.Point(-471, -164));
		}
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "Defeat the Attacking Androids!"));
		return false;
}