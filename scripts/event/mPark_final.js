/*
	名字:	黑暗神殿
	地圖:	第6階段 : 黑暗神殿
	描述:	952040500
*/

var map = 951000100; //隱藏的寶物倉庫
var num = 60;

function enter(pi) {
	if (pi.getPlayer().getMap().getAllMonstersThreadsafe().size() > 0) {
		pi.getClient().getSession().write(Packages.tools.packet.CWvsContext.serverNotice(5, "Eliminate all monsters first."));
		return false;
		}
	if (Math.random() < 0.5) {
		pi.getPlayer().changeMap(pi.getMap(951000000), pi.getMap(951000000).getPortal(0)); //怪物公園
		return true;
		}
		for (var i = 0; i < num; i++)
	if (pi.getMap(map + i).getCharactersThreadsafe().size() < 1) {
		pi.getMap(map + i).resetFully();
		pi.getPlayer().changeMap(pi.getMap(map + i), pi.getMap(map + i).getPortal(0));
		pi.getEventManager("MonsterParkBonus").startInstance(pi.getPlayer());
		return true;
		}
		pi.getPlayer().changeMap(pi.getMap(951000000), pi.getMap(951000000).getPortal(0)); //怪物公園
		return true;
}