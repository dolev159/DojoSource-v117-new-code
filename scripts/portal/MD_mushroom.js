/*
	名字:	菇菇歌唱森林
	地圖:	幽靈菇菇森林
	描述:	100020400
*/

var map = 100020500; //溫暖的樹蔭
var num = 10;

function enter(pi) {
	if (pi.getPlayer().getMap().getId() != 100020400) {
		pi.getPlayer().changeMap(pi.getMap(100020400), pi.getMap(100020400).getPortal(7));
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