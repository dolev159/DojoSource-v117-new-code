/*
	名字:	米奇里
	地圖:	納希民宅
	描述:	260000200
*/

function start() {
	if (cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(3900)).getStatus() > 1) {
		cm.sendNext("The light and dark always coexist...");
		cm.dispose();
		return;
		}
		cm.sendNext("...");
		cm.dispose();
}