/*
	名字:	競技場
	地圖:	激戰薛西斯
	描述:	200101500
*/

function start() {
	cm.sendYesNo("You have finished the battle and are now being moved.");
}

function action(mode, type, selection) {
	if (mode > 0) {
		if (cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(31013)).getStatus() == 1 && cm.getPlayer().getMap().getMonsterById(6160003) == null) {
			Packages.server.quest.MapleQuest.getInstance(31018).forceStart(cm.getPlayer(), 0, 1);
			}
			cm.getPlayer().changeMap(cm.getMap(200101400), cm.getMap(200101400).getPortal(0));
			}
			cm.dispose();
}