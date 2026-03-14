/*
	名字:	北部森林
	地圖:	小樹森林
	描述:	101030300
*/

var map = 101030400; //獨眼蜥蜴
var num = 10;

function enter(pi) {
	if (pi.getPlayer().getMap().getId() != 101030300) {
		pi.getPlayer().changeMap(pi.getMap(101030300), pi.getMap(101030300).getPortal(1));
		return true;
		}
		for (var i = 0; i < num; i++)
	if (pi.getMap(map + i).getCharacters().size() < 1) {
		pi.getPlayer().changeMap(pi.getMap(map + i), pi.getMap(map + i).getPortal(4));
		return true;
		}
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "Try again soon."));
		return false;
}