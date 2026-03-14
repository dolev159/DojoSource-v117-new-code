/*
	名字:	隱藏地圖
	地圖:	傑利麥勒實驗室入口
	描述:	931050600
*/

function enter(pi) {
	pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "No, it's empty in here. I'll check somewhere else."));
	return false;
}