/*
	名字:	宮廷綠洲
	地圖:	納希宮殿
	描述:	260000300
*/

function start() {
	if (cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(3900)).getStatus() != 1) {
		cm.sendNext("The water from the Oasis seems to be clean.");
		cm.dispose();
		return;
		}
	if (cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(3900)).getCustomData() == 5) {
		cm.sendNext("The water from the Oasis is always clean. If you look closely, you can somewhat see the floor underneath the water...");
		cm.dispose();
		return;
		}
		cm.sendNext("You used two hands to drink the clean water of the Oasis. Delicious! It quenched your thirst right on the spot.");
		cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(3900)).setCustomData(5);
		cm.getPlayer().updateQuest(cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(3900)), true);
		cm.dispose();
}