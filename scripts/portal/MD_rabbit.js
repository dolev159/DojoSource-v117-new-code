/*
	名字:	玩具城
	地圖:	愛奧斯塔71樓~90樓
	描述:	221022200
*/

var map = 221023401; //兔子鼓手隱身處
var num = 10;

function enter(pi) {
	if (pi.getPlayer().getMap().getId() != 221022200) {
		pi.getPlayer().changeMap(pi.getMap(221022200), pi.getMap(221022200).getPortal(6));
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