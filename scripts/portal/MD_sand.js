/*
	名字:	日落之路
	地圖:	薩赫勒地區2
	描述:	260020600
*/

var map = 260020630; //風沙之丘
var num = 10;

function enter(pi) {
	if (pi.getPlayer().getMap().getId() != 260020600) {
		pi.getPlayer().changeMap(pi.getMap(260020600), pi.getMap(260020600).getPortal(6));
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