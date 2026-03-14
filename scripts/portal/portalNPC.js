/*
	名字:	獅子王城
	地圖:	見面室前走道
	描述:	211070000
*/

function enter(pi) {
	if (pi.getPlayer().getMap().getId() != 211070000 && pi.getPlayer().getMap().getAllMonstersThreadsafe().size() > 0) {
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "Battle is in progress. Click the portal if you would like to exit."));
		return false;
		}
		pi.openNpc(2161005);
		return true;
}