/*
	名字:	玩具城
	地圖:	遺忘的迴廊
	描述:	220070400
*/

function enter(pi) {
	pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "The door is impossible to open."));
	return false;
}