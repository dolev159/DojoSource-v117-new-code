/*
	名字:	隱藏地圖
	地圖:	傑利麥勒實驗室入口
	描述:	931050600
*/

function enter(pi) {
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(20743)).getStatus() < 1) {
		Packages.server.quest.MapleQuest.getInstance(20743).forceStart(pi.getPlayer(), 0, 1);
		}
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "Is that a voice you hear ...? This must be the place. Return to Claudine."));
		return false;
}