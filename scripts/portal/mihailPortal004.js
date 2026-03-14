/*
	名字:	隱藏地圖
	地圖:	林伯特家的雜貨店
	描述:	913070004
*/

var map = 913070050; //雜貨商店後院
var num = 20;

function enter(pi) {
	for (var i = 0; i < num; i++)
	if (pi.getMap(map + i).getCharacters().size() < 1) {
		pi.getMap(map + i).resetFully();
		pi.getPlayer().changeMap(pi.getMap(map + i), pi.getMap(map + i).getPortal(0));
		return true;
		}
		pi.getClient().getSession().write(Packages.tools.packet.CWvsContext.serverNotice(5, "Try again soon."));
		return false;
}