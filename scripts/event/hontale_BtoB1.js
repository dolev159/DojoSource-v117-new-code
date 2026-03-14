/*
	名字:	生命之穴
	地圖:	迷宮室
	描述:	240050100
*/

function enter(pi) {
	if (pi.getPlayer().itemQuantity(4001087)) {
		pi.getClient().getSession().write(Packages.tools.packet.CWvsContext.serverNotice(5, "Only those who have the crystal of the first maze room can pass through this portal."));
		return false;
		}
		pi.getClient().getSession().write(Packages.tools.packet.CWvsContext.serverNotice(5, "You are moved to somewhere by the power of the crystal in the first maze room."));
		pi.getPlayer().changeMap(pi.getMap(240050101), pi.getMap(240050101).getPortal(0)); //第一個迷宮室
		pi.gainItem(4001087, -1);
		return true;
}