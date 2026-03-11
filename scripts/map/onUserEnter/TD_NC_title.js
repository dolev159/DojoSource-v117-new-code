/*
	名字:	泰拉森林
	地圖:	泰拉森林時空之門
	描述:	240070000
*/

var quest = true;

var status;

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	switch (mode) {
	case -1:
		ms.dispose();
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
		if ((ms.getPlayer().getMap().getId() / 100) % 10 != 0) {
			ms.getClient().getSession().write(Packages.tools.packet.CField.environmentChange("temaD/enter/neoCity" + ((ms.getPlayer().getMap().getId() / 100) % 10), 3));
			ms.dispose();
			return;
			}
		if (ms.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(3762)).getStatus() != 1 && quest) {
		if (ms.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(3773)).getStatus() == 1) {
			ms.getPlayer().updateInfoQuest(3755, "ent=1");
			ms.getClient().getSession().write(Packages.tools.packet.CField.NPCPacket.getNPCTalk(2082004, 0, "I've never even heard of a monster like that one... I wonder if Andy knows anything about it.", "00 00", 16));
			}
			ms.getClient().getSession().write(Packages.tools.packet.CField.environmentChange("temaD/enter/teraForest", 3));
			ms.dispose();
			return;
			}
		if (ms.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(3762)).getStatus() < 2) {
			Packages.server.quest.MapleQuest.getInstance(3762).forceComplete(ms.getPlayer(), ms.getNpc());
			ms.getClient().getSession().write(Packages.tools.packet.CWvsContext.getShowQuestCompletion(3762));
			ms.getClient().getSession().write(Packages.tools.packet.CField.environmentChange("temaD/enter/teraForest", 3));
			ms.gainExp(430698);
			quest = false;
			}
			ms.sendNextS("... Where am I?", 16);
			break;
	case 1:
		ms.sendNextPrevS("Did the watch in my hand bring me here?", 4, 2082004);
		break;
	case 2:
		ms.sendNextPrevS("You're back. What happened?", 16);
		break;
	case 3:
		ms.sendNextPrevS("You got wrapped up too, did you? Well, l can explain. I'll do my best to make a long story short.", 4, 2082004);
		break;
	case 4:
		ms.dispose();
}
}