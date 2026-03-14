/*
	名字:	生命之穴
	地圖:	試煉之穴Ⅰ
	描述:	240060000
*/

function enter(pi) {
	if ((pi.getPlayer().getMap().getId() == 240060000 && pi.getMap(240060000).getReactorByName("tremble1").getState() > 0) || pi.getMap(240060100).getReactorByName("tremble2").getState() > 0) {
	if (pi.getPlayer().getMap().getAllMonstersThreadsafe().size() < 1) {
		pi.getPlayer().changeMap(pi.getMap(pi.getPlayer().getMap().getId() + 100), pi.getMap(pi.getPlayer().getMap().getId() + 100).getPortal(0)); //試煉之穴Ⅱ
		return true;
		}
		}
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "The portal does not work now."));
		return false;
}