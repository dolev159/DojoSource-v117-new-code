/*
	名字:	玩具城
	地圖:	遺忘的時間之路&amp;lt;1&gt;
	描述:	220070000
*/

var map = 220070001; //空間的扭曲
var num = 10;

function enter(pi) {
	if (pi.getPlayer().getMap().getId() != 220070000) {
		pi.getPlayer().changeMap(pi.getMap(220070000), pi.getMap(220070000).getPortal(9));
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