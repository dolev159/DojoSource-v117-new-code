/*
	名字:	Defeat the Guards!
	地圖:	Space Station Hectare 1
	描述:	552000010
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
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(53245)).getStatus() < 1) {
			Packages.server.quest.MapleQuest.getInstance(53245).forceStart(qm.getPlayer(), qm.getNpc(), null);
			qm.dispose();
			return;
			}
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(53245)).getStatus() < 2) {
			Packages.server.quest.MapleQuest.getInstance(53245).forceComplete(qm.getPlayer(), qm.getNpc());
			qm.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.IntroEnableUI(1));
			}
			qm.sendNextS("The ship should be beyond the portal. That's our ticket out of here... if we can get in.", 1);
			break;
	case 1:
      		qm.sendNextPrevS("The lockdown protocols are going to be impossible to get by without the #rMaster Key#k...", 1);
		break;
	case 2:
      		qm.sendNextPrevS("Master Key?!", 3);
		break;
	case 3:
      		qm.sendNextPrevS("The Key Keeper should have it. Hurry and get the #rMaster Key#k before the guards come!", 1);
		break;
	case 4:
		qm.dispose();
		qm.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.IntroEnableUI(0));
		Packages.server.quest.MapleQuest.getInstance(53247).forceStart(qm.getPlayer(), qm.getNpc(), null);
}
}