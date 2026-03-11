/*
	名字:	雷德拓
	地圖:	危險！臨時機場
	描述:	931000420
*/

function start() {
	if (cm.getPlayer().getMap().getAllMonstersThreadsafe().size() > 0) {
		cm.sendNext("You want to trade the water now?! Can't you see them eyeing it? Defeat all of the thieves first!");
		cm.dispose();
		return;
		}
		cm.sendOk("Whew, we're safe. Now, about that water...");
}

function action(mode, type, selection) {
	if (mode > 0) {
		Packages.server.quest.MapleQuest.getInstance(23131).forceStart(cm.getPlayer(), 0, 1);
		cm.getPlayer().changeMap(cm.getMap(310000010), cm.getMap(310000010).getPortal(0));
		}
		cm.dispose();
}