/*
	名字:	小鋼珠轉蛋機
	地圖:	新叶城-市区中心
	描述:	600000000
*/

var prize = new Array(1472010, 1402010, 1382001, 1452000, 1302026, 1472023, 1472019, 1472022, 1102011, 1472033, 1402017, 1442009, 1472013, 1472021, 1472075, 2000004, 1382005, 1332030, 1432001, 2044901, 2044902, 1422025, 1442015, 1432017, 1442025, 1312004, 1322015, 1462005, 1312012, 1302003, 1442004, 1302028, 1402006, 1322000, 2022195, 1412001, 1372002, 1472009, 1422001, 1462000, 1412004, 1452008, 1432016, 1302021, 4000176, 1442000, 2000005, 2022113, 1432013, 1322024, 1322012, 1302012, 1102028, 1452006, 1302013, 1462007, 1332016, 2043102, 2043112, 2044101, 2044002, 2044001, 2041011, 2041010, 2044602, 2044601, 2043305, 2044401, 2044314, 2043702, 2043701, 1432004, 1472054, 1462006, 1472012, 1442010, 1472008, 1472005, 1382006, 1422007, 1332000, 1402000, 1452007, 1402009, 1102029, 1402001, 1372005, 1442021, 2040915, 2040919, 2040920, 2040914, 2041301, 2041304, 2041307, 2041310, 2044803, 2044804);

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
			cm.gainItem(cm.getPlayer().itemQuantity(5220000) && cm.getPlayer().getMap().getId() == 600000000 ? 5220000 : 5451000, -1);
			cm.sendOk("You have obtained #b#t" + z + "##k.");
			cm.dispose();
			return;
			}
			cm.sendOk("Please check your item inventory and see if you have the ticket, or if the inventory is full.");
			}
			cm.dispose();
}