/*
	名字:	生命之穴
	地圖:	第一個迷宮室
	描述:	240050101
*/

function enter(pi) {
                var stage = pi.getPlayer().getMap().getId() - 240050100;
	if (pi.getPlayer().getMap().getId() == 240050105) {
	if (pi.getPlayer().itemQuantity(4001092) < 1) {
		pi.getClient().getSession().write(Packages.tools.packet.CWvsContext.serverNotice(5, "You need the power of the red key to move."));
		return false;
		}
		pi.getPlayer().getMap().broadcastMessage(Packages.tools.packet.CWvsContext.serverNotice(6, "You are moved to somewhere by the power of the red key."));
		pi.warpMap(240050100, 0);
		return true;
		}
	if (pi.getMap(240050100).getReactorByName("keyDrop" + stage).getState() < 1) {
		pi.getClient().getSession().write(Packages.tools.packet.CWvsContext.serverNotice(5, "The portal doesn't work now."));
		return false;
		}
		pi.warpMap(pi.getPlayer().getMap().getId() +1, 0);
		return true;
}