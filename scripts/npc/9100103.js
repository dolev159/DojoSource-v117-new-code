/*
	名字:	轉蛋機
	地圖:	墮落城市
	描述:	103000000
*/

var prize = new Array(2040402, 2022130, 4130014, 2000004, 2000005, 2022113, 1322008, 1302021, 1322022, 1302013, 1051010, 1060079, 1002005, 1002023, 1002085, 1332017, 1322010, 1051031, 1002212, 1002117, 1040081, 1051037, 1472026, 1332015, 1041060, 1472003, 1060086, 1060087, 1472009, 1060051, 1041080, 1041106, 1092018);

function start() {
	if (cm.getPlayer().itemQuantity(5220000) < 1 && cm.getPlayer().itemQuantity(5451000) < 1) {
		cm.sendOk("You don't have a single ticket with you. Please buy the ticket at the department store before coming back to me. Thank you.");
		cm.dispose();
		return;
		}
		cm.sendYesNo("You have some #bGachapon Tickets#k there. \r\nWould you like to try your luck?");
}

function action(mode, type, selection) {
	if (mode > 0) {
		z = cm.gainGachaponItem(prize[Math.floor(Math.random() * prize.length)], 1);
		if (z != -1) {
			cm.gainItem(cm.getPlayer().itemQuantity(5220000) && cm.getPlayer().getMap().getId() == 103000000 ? 5220000 : 5451000, -1);
			cm.sendOk("You have obtained #b#t" + z + "##k.");
			cm.dispose();
			return;
			}
			cm.sendOk("Please check your item inventory and see if you have the ticket, or if the inventory is full.");
			}
			cm.dispose();
}