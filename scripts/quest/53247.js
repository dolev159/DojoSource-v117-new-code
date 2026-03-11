/*
	名字:	Find the Master Key!
	地圖:	Key Keeper's Room
	描述:	552000021
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
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(53247)).getStatus() < 1) {
			Packages.server.quest.MapleQuest.getInstance(53247).forceStart(qm.getPlayer(), qm.getNpc(), null);
			qm.dispose();
			return;
			}
			qm.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.IntroEnableUI(1));
			qm.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(1, 1000));
			break;
	case 1:
		qm.sendNextS("(This oughtta get us off of this rock...)", 1);
		break;
	case 2:
      		qm.sendNextPrevS("#b(I've got the Master Key. What am I waiting for?! I should get back to #p9270083#.)", 3);
		break;
	case 3:
		qm.dispose();
		qm.getPlayer().changeMap(qm.getMap(552000022), qm.getMap(552000022).getPortal(0));
		Packages.server.quest.MapleQuest.getInstance(53247).forceComplete(qm.getPlayer(), qm.getNpc());
}
}