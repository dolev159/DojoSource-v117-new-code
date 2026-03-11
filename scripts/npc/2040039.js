/*
	名字:	黃綠氣球
	地圖:	遺棄之塔&amp;lt;第2階段&gt;
	描述:	922010400
*/

function start() {
	var eim = cm.getPlayer().getEventInstance();
	if (eim.getProperty("stage2") == null || cm.getPlayer().getParty().getLeader().getId() != cm.getPlayer().getId()) {
		cm.sendNext("In the second stage, the Dimensional Schism has spawned a place of pure darkness. Monsters called #b#o9300008##k have hidden themselves in the darkness. Defeat all of them, and then talk to me to proceed to the next stage.");
		cm.dispose();
		return;
		}
		cm.sendNext("Congratulations on clearing the quests for this stage. Please use the portal you see over there and move on to the next stage.");
		cm.dispose();
}