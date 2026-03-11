/*
	名字:	瓦尼
	地圖:	埃德爾斯坦
	描述:	310000000
*/

function start() {
	cal = java.util.Calendar.getInstance();
	hour = cal.get(java.util.Calendar.HOUR_OF_DAY);
	if (hour > 20 && hour < 23 && cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(23938)).getStatus() == 1) {
		Packages.server.quest.MapleQuest.getInstance(23984).forceStart(cm.getPlayer(), 0, 1);
		cm.sendNext("What are you looking at? I'm not standing here because I miss Gabrielle. I just...want to make sure that no thieves get in. Yeah.");
		cm.dispose();
		return;
		}
		cm.sendOk("What are you looking at? It's break time. I can do whatever I want.");
		cm.dispose();
}