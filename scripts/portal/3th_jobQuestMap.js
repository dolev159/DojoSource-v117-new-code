/*
	名字:	隱藏地圖
	地圖:	閃亮的水晶通路
	描述:	910540000
*/

var num = 10;

function enter(pi) {
	var map = 910540000 + (Math.floor(pi.getPlayer().getJob() / 100) * 100);
		for (var i = 0; i < num; i++)
	if (pi.getMap(map + i).getCharacters().size() < 1) {
		pi.getMap(map + i).resetFully();
		pi.getPlayer().changeMap(pi.getMap(map + i), pi.getMap(map + i).getPortal(1)); //異次元的世界
		pi.getPlayer().startMapTimeLimitTask(1200, pi.getMap(211040401));
		return true;
		}
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "Try again soon."));
		return false;
}