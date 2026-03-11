/*
	名字:	拳王師父
	地圖:	實驗室
	描述:	744000011
*/

var status;

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	switch (mode) {
	case -1:
		cm.dispose();
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
		if (cm.getPlayer().getEventInstance().getProperty(cm.getPlayer().getMap().getId()) != null) {
			cm.dispose();
			return;
			}
			for (var i = 0; i < 14; i++) {
		if (cm.getPlayer().getMap().getId() == cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(28921)).getCustomData().substring(i + "0", i + "9")) {
			y = i + 1;
			}
			}
			cm.sendNext("You're pretty good at fighting... translational motion! Ha!");
			break;
	case 1:
		cm.sendNextPrev("That's it for today's lesson.");
		break;
	case 2:
		cm.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.sendFourPillarsOfHeaven(y, false));
		cm.getPlayer().getEventInstance().setProperty(cm.getPlayer().getMap().getId(), 1);
		cm.dispose();
}
}