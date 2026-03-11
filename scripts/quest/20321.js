/*
	名字:	正式騎士升級試煉
	地圖:	耶雷弗
	描述:	130000000
*/

var map = 913070200;
var num = 10;

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
		qm.sendYesNo("Are you ready to enter the Test Site?");
		break;
	case 1:
		for (var i = 0; i < num; i++)
		if (qm.getMap(map + i).getCharacters().size() < 1) {
			qm.getMap(map + i).resetFully();
			qm.getPlayer().changeMap(qm.getMap(map + i), qm.getMap(map + i).getPortal(0));
			qm.getPlayer().startMapTimeLimitTask(150, qm.getMap(130000000));
			qm.dispose();
			return;
			}
			qm.getClient().getSession().write(Packages.tools.packet.CWvsContext.serverNotice(5, "Try again soon."));
			qm.dispose();
}
}