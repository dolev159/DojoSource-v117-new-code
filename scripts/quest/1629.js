/*
	名字:	[十字獵人]逐漸增強的黑暗氣息
	地圖:	偏僻泥沼
	描述:	251010500
*/

var status = -1;

function start(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		if (status < 1) {
		qm.dispose();
		return;
		}
		status--;
		break;
	case 1:
		status++;
		break;
		}
	switch (status) {
	case 0:
		qm.sendYesNo("Hey, you and Starling are tight, right? That means you can do this mission in her place.");
		break;
	case 1:
		Packages.server.quest.MapleQuest.getInstance(1629).forceStart(qm.getPlayer(), qm.getNpc(), null);
		qm.getMap().broadcastMessage(Packages.tools.packet.CField.environmentChange("crossHunter/chapter/start2", 3));
		qm.dispose();
}
}