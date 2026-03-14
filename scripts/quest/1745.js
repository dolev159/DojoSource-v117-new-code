/*
	名字:	製作繩子
	地圖:	聞味的狼
	描述:	956040400
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
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(1745)).getStatus() < 1) {
			Packages.server.quest.MapleQuest.getInstance(1745).forceStart(qm.getPlayer(), qm.getNpc(), null);
			qm.dispose();
			return;
			}
			qm.sendNextS("Alright, I think I have enough Werewolf Tails to make a rope... Let's put my awesome braiding skills to the test!", 17);
			break;
	case 1:
		qm.sendNextPrevS("All right! I made a ROPE! How outdoors-y is that?! I'm unstoppable!", 17);
		break;
	case 2:
		qm.dispose();
		qm.gainExp(14374);
		qm.gainItem(4033217, -10);
		Packages.server.quest.MapleQuest.getInstance(1745).forceComplete(qm.getPlayer(), qm.getNpc());
		qm.getPlayer().changeMap(qm.getMap(956040500), qm.getMap(956040500).getPortal(0));
}
}