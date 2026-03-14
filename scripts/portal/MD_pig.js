/*
	名字:	海岸
	地圖:	波浪海岸
	描述:	120020100
*/

var map = 120020200; //肥肥海岸
var num = 10;

function enter(pi) {
	if (pi.getPlayer().getMap().getId() != 120020100) {
		pi.getPlayer().changeMap(pi.getMap(120020100), pi.getMap(120020100).getPortal(3));
		return true;
		}
		for (var i = 0; i < num; i++)
	if (pi.getMap(map + i).getCharacters().size() < 1) {
		pi.getPlayer().changeMap(pi.getMap(map + i), pi.getMap(map + i).getPortal(1));
		return true;
		}
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "Try again soon."));
		return false;
}