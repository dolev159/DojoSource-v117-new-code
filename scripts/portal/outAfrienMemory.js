/*
	名字:	阿普立恩的記憶
	地圖:	陣地後面
	描述:	900030000
*/

function enter(pi) {
	pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "Go talk to Afrien. He is tired from the battle."));
	return false;
}