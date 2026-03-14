/*
	名字:	炎熱之路
	地圖:	仙人掌沙漠1
	描述:	260010100
*/

var map = 260010101; //燃燒山丘
var num = 10;

function enter(pi) {
	if (pi.getPlayer().getMap().getId() != 260010100) {
		pi.getPlayer().changeMap(pi.getMap(260010100), pi.getMap(260010100).getPortal(4));
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