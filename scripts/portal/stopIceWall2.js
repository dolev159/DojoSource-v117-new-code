/*
	名字:	龍沉睡的島
	地圖:	寂靜的洞穴
	描述:	914100022
*/

function enter(pi) {
	pi.getPlayer().checkFollow();
	pi.getClient().getSession().write(Packages.tools.packet.EtcPacket.instantMapWarp(pi.getPlayer().getMap().getPortal(1).getId()));
	pi.getPlayer().getMap().movePlayer(pi.getPlayer(), new java.awt.Point(pi.getPlayer().getMap().getPortal(1).getPosition()));
	return true;
}