/*
	名字:	靈藥幻境
	地圖:	金勾海賊團基地2
	描述:	251010402
*/

var map = 251010410; //搶奪寶物島
var num = 10;

function enter(pi) {
	if (pi.getPlayer().getMap().getId() != 251010402) {
		pi.getPlayer().changeMap(pi.getMap(251010402), pi.getMap(251010402).getPortal(5));
		return true;
		}
		for (var i = 0; i < num; i++)
	if (pi.getMap(map + i).getCharacters().size() < 1) {
		pi.getPlayer().changeMap(pi.getMap(map + i), pi.getMap(map + i).getPortal(2));
		return true;
		}
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "Try again soon."));
		return false;
}