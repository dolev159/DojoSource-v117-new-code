/*
	名字:	莫斯提馬
	地圖:	時間通道
	描述:	220050300
*/

var map = 927000100;

var num = 10;

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
		if (status < 1) {
		cm.sendNext("Please talk to me again when you are ready.");
		cm.dispose();
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
		cm.sendYesNo("Are you ready, #h0#? If you are, I'll send you to the past through the Crack of Time. You were very powerful in the past, #h0#, so be careful.");
		break;
	case 1:
		cm.sendNext("Good luck, #h0#.");
		break;
	case 2:
		for (var i = 0; i < num; i++)
		if (cm.getMap(map + i).getCharacters().size() < 1 && cm.getMap(map + i + 10).getCharacters().size() < 1) {
			cm.getMap(map + i).resetFully();
			cm.getPlayer().changeMap(cm.getMap(map + i), cm.getMap(map + i).getPortal(0));
			cm.dispose();
			return;
			}
			cm.getClient().getSession().write(Packages.tools.packet.CWvsContext.serverNotice(5, "Try again soon."));
			cm.dispose();
}
}