/*
	名字:	新加坡
	地圖:	毀滅公園 II
	描述:	541020610
*/

var map = 541020620;
var num = 10;

function enter(pi) {
	if (pi.getPlayer().getMap().getId() != 541020610) {
		pi.getPlayer().changeMap(pi.getMap(541020610), pi.getMap(541020610).getPortal(1));
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