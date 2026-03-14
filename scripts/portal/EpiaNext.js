/*
	名字:	獅子王城
	地圖:	秘密走道
	描述:	921140000
*/

function enter(pi) {
	if (pi.getPlayer().getMap().getMonsterById(9300295) == null) {
		pi.getPlayer().changeMap(pi.getMap(921140001), pi.getMap(921140001).getPortal(3)); //陰鬱的見面室
		return true;
		}
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "Ifia hasn't arrived yet."));
		return false;
}