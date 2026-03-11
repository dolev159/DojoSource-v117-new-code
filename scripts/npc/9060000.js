/*
	名字:	坎特
	地圖:	野豬飼育室
	描述:	923010000
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
		if (status < 1) {
		cm.sendNext("Please think carefully again before speaking to me.");
		cm.dispose();
		return;
		}
		status--;
		break;
	case 1:
		status++;
		break;
		}
		reactor = 'action' + (cm.getPlayer().itemQuantity(4031508) > 4 && cm.getPlayer().itemQuantity(4031507) > 4 ? 1 : 0);
		eval(reactor)(mode, type, selection);
}

function action0(mode, type, selection) {
	switch (status) {
	case 0:
		cm.sendYesNo("It's too bad that you haven't collected 5 each of #b#t4031508##k or #b#t4031507##k. Would you like to stop the quest and leave?");
		break;
	case 1:
		cm.sendNext("You will be transferred to #m923010100#.");
		break;
	case 2:
		cm.dispose();
		cm.getPlayer().changeMap(cm.getMap(923010100), cm.getMap(923010100).getPortal(0));
}
}

function action1(mode, type, selection) {
	switch (status) {
	case 0:
		cm.sendNext("Wow! You've succeeded in collecting 5 each of #b#t4031508##k and #b#t4031507##k! Good. Now, I will send you to #m230000003#. Please talk to me again when you get there.");
		break;
	case 1:
		cm.dispose();
		cm.getPlayer().changeMap(cm.getMap(230000003), cm.getMap(230000003).getPortal(0));
}
}