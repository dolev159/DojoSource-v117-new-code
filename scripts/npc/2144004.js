/*
	名字:	雪莉
	地圖:	燃燒的神木村2
	描述:	272000200
*/

function start() {
	if (cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(31169)).getStatus() > 1) {
		cm.sendOk("Quickly, follow Arkarium! He went through the portal on the lower right.");
		cm.dispose();
		return;
		}
	if (cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(31169)).getStatus() > 0) {
		cm.sendNext("M-my injury is graver than I thought. #h0#, please take care of the monsters in this area so I can get out of here safely.");
		cm.dispose();
		return;
		}
		cm.sendNext("You've arrived. I've been waiting for you.");
		cm.dispose();
}