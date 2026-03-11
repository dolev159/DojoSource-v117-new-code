/*
	名字:	安迪
	地圖:	泰拉森林時空之門
	描述:	240070000
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
		cm.sendSimple("Lost time...mey not be something that can be redeemed... \r\n#L0##bWhat must I do to use the Time Gate?#l\r\n#L1#I want to get the Time Traveler's Free Pass.#l");
		break;
	case 1:
		if (selection < 1) {
			cm.sendOk("In order to use the Time Gate, you'll need the #bTime Traveler's Pocket Watch#k or the #bTime Traveler's Free pass#k.");
			cm.dispose();
			return;
			}
			cm.dispose();
}
}