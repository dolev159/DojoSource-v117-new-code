/*
	名字:	艾靈森林
	地圖:	女王的藏身處
	描述:	300030310
*/

function enter(pi) {
	if (pi.getPlayer().getMap().getAllMonstersThreadsafe().size() < 1) {
		pi.getPlayer().changeMap(pi.getMap(300000010), pi.getMap(300000010).getPortal(0)); //營地會議場
		return true;
		}
		pi.openNpc(2133007);
		return true;
}