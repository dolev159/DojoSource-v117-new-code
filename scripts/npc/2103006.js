/*
	名字:	納希民宅6
	地圖:	民宅6
	描述:	260000207
*/

function start() {
	if (cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(3929)).getStatus() != 1) {
		cm.sendNext("This seems like a good spot to store food.");
		cm.dispose();
		return;
		}
	if (cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(3929)).getCustomData() == null) {
		cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(3929)).setCustomData("0000");
		}
		var progress = cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(3929)).getCustomData();
		var slot = cm.getNpc() - 2103003;
		var ch = progress[slot];
	if (ch == '3') {
		cm.sendNext("You've been here already.");
		cm.dispose();
		return;
		}
	if (cm.getPlayer().itemQuantity(4031580) < 1) {
		cm.sendNext("The food you prepared is missing. Better go back to #p2101011#.");
		cm.dispose();
		return;
		}
		var nextProgress = progress.substr(0, slot) + '3' + progress.substr(slot + 1);
		cm.gainItem(4031580, -1);
		cm.sendOk("You slowly placed the food on the floor.");
		cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(3929)).setCustomData(nextProgress);
		cm.getPlayer().updateQuest(cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(3929)), true);
		cm.dispose();
}