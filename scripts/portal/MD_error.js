/*
	名字:	卡帕萊特研究所
	地圖:	研究所C-1區
	描述:	261020300
*/

var map = 261020301; //致命的錯誤
var num = 10;

function enter(pi) {
	if (pi.getPlayer().getMap().getId() != 261020300) {
		pi.getPlayer().changeMap(pi.getMap(261020300), pi.getMap(261020300).getPortal(3));
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