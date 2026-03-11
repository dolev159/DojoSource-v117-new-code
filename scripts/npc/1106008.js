/*
	名字:	破舊的帳篷
	地圖:	暴風地帶
	描述:	102020500
*/

var map = 913070400;
var num = 10;

function start() {
	if (cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(20783)).getStatus() == 1) {
		Packages.server.quest.MapleQuest.getInstance(20783).forceStart(cm.getPlayer(), cm.getNpc(), "Discovery");
		cm.getClient().getSession().write(Packages.tools.packet.CWvsContext.getTopMsg("You found Chromile's old tent. (Complete)"));
		cm.dispose();
		return;
		}
		for (var i = 0; i < num; i++)
	if (cm.getMap(map + i).getCharacters().size() < 1 && cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(20784)).getStatus() > 1 && cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(20785)).getStatus() < 1) {
		cm.getMap(map + i).resetFully();
		cm.getPlayer().changeMap(cm.getMap(map + i), cm.getMap(map + i).getPortal(0));
		cm.dispose();
		return;
		}
		cm.dispose();
}