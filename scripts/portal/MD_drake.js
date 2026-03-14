/*
	名字:	龍族洞穴
	地圖:	洞穴出口
	描述:	105020400
*/

var map = 105020500; //龍族的藍色洞穴
var num = 10;

function enter(pi) {
	if (pi.getPlayer().getMap().getId() != 105020400) {
		pi.getPlayer().changeMap(pi.getMap(105020400), pi.getMap(105020400).getPortal(2));
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