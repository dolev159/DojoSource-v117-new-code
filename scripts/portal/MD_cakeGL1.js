/*
	名字:	隱藏的街道
	地圖:	甜蜜蛋糕山丘入口
	描述:	683000000
*/

var map = 683000100; //甜饼地图
var num = 10;

function enter(pi) {
	for (var i = 0; i < num; i++)
	if (pi.getMap(map + i).getCharacters().size() < 1) {
		pi.getPlayer().changeMap(pi.getMap(map + i), pi.getMap(map + i).getPortal(3));
		return true;
		}
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "Try again soon."));
		return false;
}