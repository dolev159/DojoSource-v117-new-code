/*
	名字:	外星基地
	地圖:	外星基地走廊 6
	描述:	610040230
*/

var map = 610040300;
var num = 10;

function enter(pi) {
	for (var i = 0; i < num; i++)
	if (pi.getMap(map + i).getCharacters().size() < 1) {
		pi.getMap(map + i).resetFully();
		pi.getPlayer().changeMap(pi.getMap(map + i), pi.getMap(map + i).getPortal(0)); //外星基地電梯
		return true;
		}
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "Try again soon."));
		return false;
}