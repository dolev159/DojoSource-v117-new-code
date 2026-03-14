/*
	名字:	猶利塔
	地圖:	猶利塔的痕跡
	描述:	926100500
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
		cm.sendNext("I... I ... I must... let ... the whole world... know... of my... work..... \r\n(Yulete can't continue.)");
		break;
	case 1:
		cm.sendNextPrev("(We better leave this place right now.)");
		break;
	case 2:
		cm.getPlayer().changeMap(cm.getMap(926100600), cm.getMap(926100600).getPortal(0));
		cm.dispose();
}
}