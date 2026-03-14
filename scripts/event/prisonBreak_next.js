/*
	名字:	隱藏地圖
	地圖:	隱藏之塔
	描述:	921160100
*/

function enter(pi) {
	if (pi.getPlayer().getMap().getId() == 921160200 && pi.getPlayer().getMap().getAllMonstersThreadsafe().size() > 0) {
		pi.getPlayer().getMap().startMapEffect("Eliminate all the guards!", 5120053);
		return false;
		}
	if (pi.getPlayer().getMap().getId() == 921160350) {
		eim = pi.getPlayer().getEventInstance();
		for (var i = 0; i < eim.getPlayers().size(); i++)
		eim.getPlayers().get(i).changeMap(eim.getMapInstance(921160400), eim.getMapInstance(921160400).getPortal(0));
		return true;
		}
	if (pi.getPlayer().getMap().getId() == 921160400 && pi.getPlayer().getMap().getAllMonstersThreadsafe().size() > 0) {
		pi.getPlayer().getMap().startMapEffect("Eliminate all the guards!", 5120053);
		return false;
		}
	if (pi.getPlayer().getMap().getId() == 921160600 && pi.getPlayer().getMap().getReactorById(9219000).getState() < 4) {
		pi.getPlayer().getMap().startMapEffect("Find the key to open the prison door.", 5120053);
		return false;
		}
		pi.warpMap(pi.getPlayer().getMap().getId() + 100, 0);
		return true;
}