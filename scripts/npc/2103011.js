/*
	名字:	納希民宅4 櫥櫃
	地圖:	民宅4
	描述:	260000205
*/

function start() {
	if (cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(3926)).getStatus() != 1) {
		cm.sendNext("This looks like a good place to drop the treasure.");
		cm.dispose();
		return;
		}
	if (cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(3926)).getCustomData() == null) {
		cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(3926)).setCustomData("0000");
		}
		var progress = cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(3926)).getCustomData();
		var slot = cm.getNpc() - 2103009;
		var ch = progress[slot];
	if (ch == '3') {
		cm.sendNext("You've been here already.");
		cm.dispose();
		return;
		}
	if (cm.getPlayer().itemQuantity(4031579) < 1) {
		cm.sendNext("The treasure prepared for this is missing. Better go back to the hideaway spot of the Red Scorpions and get another one.");
		cm.dispose();
		return;
		}
		var nextProgress = progress.substr(0, slot) + '3' + progress.substr(slot + 1);
		cm.gainItem(4031579, -1);
		cm.sendOk("You carefully placed the treasure on the ground.");
		cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(3926)).setCustomData(nextProgress);
		cm.getPlayer().updateQuest(cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(3926)), true);
		cm.dispose();
}