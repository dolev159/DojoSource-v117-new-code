/*
	名字:	[十字獵人] A級獵人之路
	地圖:	亡者之林Ⅳ
	描述:	211041400
*/

var status = -1;

function end(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		status--;
		break;
	case 1:
		status++;
		break;
		}
	switch (status) {
	case 0:
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(1663)).getStatus() < 1) {
			Packages.server.quest.MapleQuest.getInstance(1663).forceStart(qm.getPlayer(), qm.getNpc(), null);
			qm.dispose();
			return;
			}
			qm.sendNext("#p9073005# probably mentioned something about a reward? Well, this is for you, #h0#, for investigating the Mystic Gates so effectively.");
			break;
	case 1:
		qm.sendNextPrev("You already received your Rank A hunter title from the UI, right? If not, open up the Silent Crusade UI and grab it. I've included a Iittle something extra for you, too...");
		break;
	case 2:
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(1663)).getStatus() < 2) {
			Packages.server.quest.MapleQuest.getInstance(1663).forceComplete(qm.getPlayer(), qm.getNpc());
			qm.gainItem(4310029, 50);
			qm.gainExp(594164);
			}
			qm.sendNextPrevS("See you at your next mission. Take care.", 1);
			break;
	case 3:
		qm.getMap().broadcastMessage(Packages.tools.packet.CField.environmentChange("crossHunter/chapter/end3", 3));
		qm.dispose();
}
}