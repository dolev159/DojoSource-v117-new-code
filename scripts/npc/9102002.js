/*
	名字:	歐思特
	地圖:	弓箭手村市場
	描述:	100000100
*/

var prize = new Array(2430292, 2430294, 2430296, 2430298, 2430300, 2430302, 2430304, 2430306, 2430308, 2430310, 2430312, 2430314, 2430316, 2430318, 2430320, 2430324, 2430330, 2430332, 2430334, 2430338, 2430340, 2430342, 2430344, 2430345, 2430347, 2430349, 2430351, 2430353, 2430355, 2430357, 2430359, 2430361, 2430363, 2430392);

function start() {
	cm.sendYesNo("Would you like to use the Mount Gachapon Ticket?");
}

function action(mode, type, selection) {
	switch (mode) {
	case 0:
		cm.sendNext("See you later!");
		break;
	case 1:
		if (cm.getPlayer().itemQuantity(5220082) < 1) {
			cm.sendOk("Come back when you have a Gachapon Ticket.");
			cm.dispose();
			return;
			}
			z = cm.gainGachaponItem(prize[Math.floor(Math.random() * prize.length)], 1);
		if (z != -1) {
			cm.gainItem(5220082, -1);
			cm.sendOk("You have rarned #b#t" + z + "##k!");
			cm.dispose();
			return;
			}
			cm.sendNext("Check to make sure you have a free spot in your Use inventory.");
			}
			cm.dispose();
}