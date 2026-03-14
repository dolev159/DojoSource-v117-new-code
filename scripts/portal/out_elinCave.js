/*
	名字:	艾靈森林
	地圖:	洞穴深處
	描述:	300010420
*/

function enter(pi) {
	if (pi.getPlayer().getMap().getAllMonstersThreadsafe().size() < 1) {
		pi.getPlayer().changeMap(pi.getMap(300010400), pi.getMap(300010400).getPortal(2)); //石山入口
		return true;
		}
		pi.openNpc(2132000);
		return true;
}
