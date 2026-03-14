/*
	名字:	女皇之路
	地圖:	演武场入口
	描述:	130020000
*/

var map = [913070330, 913070340, 913070340];
var quest = [20774, 20775, 20776];

function enter(pi) {
	for (var i = 0; i < quest.length; i ++)
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(quest[i])).getStatus() == 1) {
		pi.getPlayer().changeMap(pi.getMap(map[i]), pi.getMap(map[i]).getPortal(1));
		}
		return false;
}