/*
	名字:	神木村
	地圖:	冰火戰場
	描述:	240020500
*/

var map = 240020501; //半人馬的圓桌
var num = 10;

function enter(pi) {
	if (pi.getPlayer().getMap().getId() != 240020500) {
		pi.getPlayer().changeMap(pi.getMap(240020500), pi.getMap(240020500).getPortal(4));
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