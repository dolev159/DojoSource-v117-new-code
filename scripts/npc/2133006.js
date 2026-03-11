/*
	名字:	艾畢奈亞的隱身處
	地圖:	蝴蝶精的森林2
	描述:	300030300
*/

function start() {
	cm.sendYesNo("This is Epinea's hideout. \r\nIf you haven't gotten permission, you shouldn't be here. \r\nEnter anyway?");
}

function action(mode, type, selection) {
	if (mode > 0) {
		if (cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(31228)).getStatus() < 0) {
			cm.sendOk("You may not approach the Queen's Hiding Place just yet. The Choosing Survival quest has not been completed.");
			cm.dispose();
			return;
			}
		if (cm.getMap(300030310).getCharacters().size() < 1) {
			cm.getMap(300030310).resetFully();
			cm.getPlayer().changeMap(cm.getMap(300030310), cm.getMap(300030310).getPortal(1));
			cm.getPlayer().startMapTimeLimitTask(900, cm.getMap(300000010));
			cm.dispose();
			return;
			}
			cm.getClient().getSession().write(Packages.tools.packet.CWvsContext.serverNotice(5, "Try again soon."));
			}
			cm.dispose();
}