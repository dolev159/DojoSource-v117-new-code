/*
	名字:	地球防衛總部
	地圖:	克嵐草原Ⅰ
	描述:	221040000
*/

var map = 221040001; //注意！ 外星人出沒區域
var num = 10;

function enter(pi) {
	if (pi.getPlayer().getMap().getId() != 221040000) {
		pi.getPlayer().changeMap(pi.getMap(221040000), pi.getMap(221040000).getPortal(4));
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