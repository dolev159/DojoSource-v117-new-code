/*
	名字:	馬來西亞
	地圖:	夢幻樂園3
	描述:	551030000
*/

var map = 551030001; //掰掰站最久的一环
var num = 10;

function enter(pi) {
	if (pi.getPlayer().getMap().getId() != 551030000) {
		pi.getPlayer().changeMap(pi.getMap(551030000), pi.getMap(551030000).getPortal(3));
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