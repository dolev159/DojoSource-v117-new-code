/*
	名字:	水晶花園
	地圖:	水晶花園
	描述:	150000000
*/

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
		if (ms.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(25001)).getCustomData() == 1) {
			ms.dispose();
			return;
			}
			ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.playMovie("phantom.avi", true));
			break;
	case 1:
		while (ms.getPlayer().getLevel() < 10) {
			ms.getPlayer().levelUp();
			}
			ms.gainItem(1142375, 1);
			ms.getPlayer().changeJob(2400);
			Packages.server.quest.MapleQuest.getInstance(25001).forceStart(ms.getPlayer(), 0, 1);
			Packages.server.quest.MapleQuest.getInstance(25010).forceStart(ms.getPlayer(), 0, 0);
			ms.dispose();
}
}