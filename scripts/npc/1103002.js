/*
	名字:	馬提厄斯
	地圖:	墮落城市
	描述:	103000000
*/

var map = 913070800;
var num = 4;

function start() {
	if (cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(20807)).getStatus() != 1) {
		cm.sendOk("I am currently gathering information on Ereve.");
		cm.dispose();
		return;
		}
		cm.sendYesNo("Would you like to try the first entry test now?");
}

function action(mode, type, selection) {
	if (mode > 0) {
		for (var i = 0; i < num; i++)
	if (cm.getMap(map + i).getCharacters().size() < 1) {
		cm.getMap(map + i).resetFully();
		cm.getPlayer().changeMap(cm.getMap(map + i), cm.getMap(map + i).getPortal(0));
		cm.getPlayer().startMapTimeLimitTask(180, cm.getMap(103000000));
		cm.dispose();
		return;
		}
		cm.getClient().getSession().write(Packages.tools.packet.CWvsContext.serverNotice(5, "Try again soon."));
		}
		cm.dispose();
}