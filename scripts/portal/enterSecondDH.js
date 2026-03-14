/*
	名字:	皇后之路
	地圖:	練武場入口
	描述:	130020000
*/

var quest = [20201, 20202, 20203, 20204, 20205];
var rand = Math.floor(Math.random() * 3);

function enter(pi) {
	for (var i = 0; i < quest.length; i ++)
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(quest[i])).getStatus() == 1) {
		pi.getPlayer().changeMap(pi.getMap(913001000 + rand), pi.getMap(913001000 + rand).getPortal(0));
		}
		return true;
}