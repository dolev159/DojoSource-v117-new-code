/*
	名字:	隱藏地圖
	地圖:	猶利塔的辦公室
	描述:	926100203
*/

function enter(pi) {
	if (pi.getPlayer().getMap().getReactorByName("rnj6_out").getState() < 1) {
		return false;
		}
	if (pi.getPlayer().getMap().getAllMonstersThreadsafe().size() > 0) {
		pi.getClient().getSession().write(Packages.tools.packet.CWvsContext.serverNotice(5, "Unable to use the portal due to the monsters."));
		return false;
		}
		pi.getPlayer().changeMap(pi.getMap(926100300), pi.getMap(926100300).getPortal(0)); //研究室走廊
		return true;
}