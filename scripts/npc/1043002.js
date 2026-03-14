/*
	名字:	空牆
	地圖:	廢棄的工地
	描述:	103010100
*/

var map = Array(103000003, 103010100, 103020000);

function start() {
	if (cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(2358)).getStatus() != 1) {
		cm.sendOk("This wall looks as if something can be attached to it.");
		cm.dispose();
		return;
		}
	if (cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(2358)).getCustomData() == null) {
		cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(2358)).setCustomData("000");
		}
		for (var i = 0; i < map.length; i++)
	if (cm.getPlayer().getMap().getId() == map[i]) {
		slot = i;
		}
		progress = cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(2358)).getCustomData();
		ch = progress[slot];
	if (ch == '1') {
		cm.sendOk("The poster has been attached. Now make your escape.");
		cm.dispose();
		return;
		}
		cm.sendYesNo("There is an empty space here for you to put up the poster. Do you wish to attach the poster here?");
}

function action(mode, type, selection) {
	if (mode > 0) {
		var next = progress.substr(0, slot) + '1' + progress.substr(slot + 1);
		cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(2358)).setCustomData(next);
		cm.getPlayer().updateQuest(cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(2358)), true);
		cm.showNpcSpecialEffect(1043002, "q2358");
		cm.sendNext("The poster has been attached.");
		}
		cm.dispose();
}