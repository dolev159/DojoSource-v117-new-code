/*
	名字:	神木村
	地圖:	被遺留的龍之巢穴
	描述:	240040511
*/

var map = 240040800; //復活的記憶
var num = 10;

function enter(pi) {
	if (pi.getPlayer().getMap().getId() != 240040511) {
		pi.getPlayer().changeMap(pi.getMap(240040511), pi.getMap(240040511).getPortal(6));
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