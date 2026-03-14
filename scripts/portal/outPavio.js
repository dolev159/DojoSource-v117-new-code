/*
	名字:	帕必歐
	地圖:	可疑的美髮店
	描述:	931010030
*/

function enter(pi) {
	if (pi.getPlayer().getMap().getAllMonstersThreadsafe().size() > 0) {
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "There are a lot of dangerous Firebombs scattered around. Destroy them!"));
		return false;
		}
		pi.getPlayer().changeMap(pi.getMap(310000000), pi.getMap(310000000).getPortal(17)); //埃德爾斯坦
		return true;
}