/*
	名字:	奧拉
	地圖:	未知廢礦區I
	描述:	280010000
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
		reactor = 'action' + (cm.getPlayer().itemQuantity(4001018) ? 2 : cm.getPlayer().itemQuantity(4001015) ? 1 : 0);
		eval(reactor)(mode, type, selection);
}

function action0(mode, type, selection) {
	switch (status) {
	case 0:
		cm.sendNext("You must be the people who came to investigate dead mines.");
		break;
	case 1:
		cm.sendNextPrev("This path has the entrances to numerous caves. There are boxes inside of caves. #bDestroy the boxes#k to #bacquire various items#k.");
		break;
	case 2:
		cm.sendNextPrev("Please note that you cannot break boxes by using your skills. You can only damage them with your normal attacks.");
		break;
	case 3:
		cm.dispose();
}
}

function action1(mode, type, selection) {
	switch (status) {
	case 0:
		cm.sendNext("You got #bPaper Document#k!");
		break;
	case 1:
		cm.sendNextPrev("I don't really need it. Maybe you can just take it.");
		break;
	case 2:
		cm.dispose();
}
}

function action2(mode, type, selection) {
	switch (status) {
	case 0:
		cm.sendNext("You got #bFire Ore#k!");
		break;
	case 1:
		cm.sendNextPrev("Good work! That item was used to refine #bEye of Fire#k before, but not anymore. You can keep it.");
		break;
	case 2:
		cm.dispose();
}
}