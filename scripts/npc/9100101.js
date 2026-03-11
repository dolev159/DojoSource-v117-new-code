/*
	名字:	轉蛋機
	地圖:	魔法森林
	描述:	101000000
*/

var prize = new Array(2000005, 2022113, 2002018, 1382001, 1050008, 1442017, 1002084, 1050003, 1002064, 1061006, 1051027, 1442009, 1050056, 1051047, 1050049, 1040080, 1051055, 1372010, 1422005, 1002143, 1302027, 1061087, 1372003, 1302019, 1051023, 1050054, 1061083, 1051017, 1002028, 1322010, 1332013, 1050055, 1002245);

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
			cm.gainItem(cm.getPlayer().itemQuantity(5220000) && cm.getPlayer().getMap().getId() == 101000000 ? 5220000 : 5451000, -1);
			cm.sendOk("You have obtained #b#t" + z + "##k.");
			cm.dispose();
			return;
			}
			cm.sendOk("Please check your item inventory and see if you have the ticket, or if the inventory is full.");
			}
			cm.dispose();
}