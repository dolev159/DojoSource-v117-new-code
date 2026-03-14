/*
	名字:	藍色酒瓶
	地圖:	墮落城市酒吧
	描述:	103000003
*/

var map = Array(103000003, 103010100, 103020000);

function start() {
	if (cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(2358)).getStatus() != 1) {
		cm.sendOk("lt's a half-filled blue bottle.");
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
	if (ch == '2') {
		cm.sendOk("The bomb has been installed. Now make your escape.");
		cm.dispose();
		return;
		}
		cm.sendYesNo("It's a half-filled blue bottle... Do you wish to install the bomb?");
}

function action(mode, type, selection) {
	if (mode > 0) {
		var next = progress.substr(0, slot) + '2' + progress.substr(slot + 1);
		cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(2358)).setCustomData(next);
		cm.getPlayer().updateQuest(cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(2358)), true);
		cm.sendNext("The bomb has been installed.");
		}
		cm.dispose();
}