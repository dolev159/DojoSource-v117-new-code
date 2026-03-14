/*
	名字:	埃德爾斯坦
	地圖:	發電廠大廳
	描述:	931050700
*/

function enter(pi) {
	if (pi.getPlayer().getMap().getAllMonstersThreadsafe().size() < 1) {
		pi.getPlayer().changeMap(pi.getMap(931050701), pi.getMap(931050701).getPortal(1));
		}
		return false;
}