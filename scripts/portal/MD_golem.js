/*
	名字:	石巨人寺院
	地圖:	石巨人的寺院4
	描述:	100040400
*/

var map = 100040500; //倒塌的石巨人聖地
var num = 10;

function enter(pi) {
	if (pi.getPlayer().getMap().getId() != 100040400) {
		pi.getPlayer().changeMap(pi.getMap(100040400), pi.getMap(100040400).getPortal(4));
		return true;
		}
		for (var i = 0; i < num; i++)
	if (pi.getMap(map + i).getCharacters().size() < 1) {
		pi.getPlayer().changeMap(pi.getMap(map + i), pi.getMap(map + i).getPortal(3));
		return true;
		}
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "Try again soon."));
		return false;
}