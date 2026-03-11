/*
	名字:	夢境
	地圖:	被破壞的弓箭手村
	描述:	271010000
*/

var status = -1;

function start(mode, type, selection) {
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
		qm.sendNextS("What's this? A Dream Fragment...? What could it do? \r\nPerhaps someone in town knows. \r\nAthena Pierce might know.", 3);
		break;
	case 1:
		Packages.server.quest.MapleQuest.getInstance(31158).forceStart(qm.getPlayer(), qm.getNpc(), null);
		qm.dispose();
}
}