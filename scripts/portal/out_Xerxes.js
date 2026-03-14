/*
	名字:	天上的克里塞
	地圖:	激戰薛西斯
	描述:	200101500
*/

function enter(pi) {
	if (pi.getPlayer().getMap().getAllMonstersThreadsafe().size() > 0) {
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "Battle is in progress. Click the portal if you would like to exit."));
		return false;
		}
		pi.openNpc(2170007);
		return true;
}