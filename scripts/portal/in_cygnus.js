/*
	名字:	騎士團要塞
	地圖:	西格諾斯庭園
	描述:	271040000
*/

function enter(pi) {
	if (pi.getPlayer().getMap().getId() != 271040000 && pi.getPlayer().getMap().getAllMonstersThreadsafe().size() > 0) {
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "Battle is in progress. Click the portal if you would like to exit."));
		return false;
		}
		pi.openNpc(2143004);
		return true;
}