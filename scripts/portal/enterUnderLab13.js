/*
	名字:	隱藏地圖
	地圖:	傑利麥勒實驗室入口
	描述:	931000630
*/

function enter(pi) {
	pi.getPlayer().addHP(pi.getPlayerStat("HP") > 100 ? -(pi.getPlayerStat("HP") / 2) : 0);
	pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "OUCH! You just got shocked! This can't be the right lab."));
	return false;
}