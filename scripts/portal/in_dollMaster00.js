/*
	名字:	龍族洞穴
	地圖:	冰冷的風
	描述:	105020200
*/

function enter(pi) {
	pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "The cave is blocked."));
	return false;
}