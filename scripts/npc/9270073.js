/*
	名字:	白毛黑鼻
	地圖:	白色聖誕節之丘
	描述:	555000000
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
		if (status < 2) {
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
		cm.sendNext("Hi There~ It's #bChristmas#k right now, do you wish to plant the Christmas Tree with me? With the Spirit from #bChristmas Decoration#k it can allow the tree to grow healthy! Please gather all the Christmas Decoration that you get from the monsters...");
		break;
	case 1:
		cm.sendSimple("#eEach time users collect the required Christmas Decoration, we can set the tree to grow to its maximum! \r\n#L0##bHere, I brought the Christmas Decoration.#l\r\n#L1#Please show me the current status on collecting the Christmas Decoration.#l");
		break;
	default:
		if (status == 2 && type == 5) select = selection;
		reactor = 'action' + select;
		eval(reactor)(mode, type, selection);
}
}

function action0(mode, type, selection) {
	switch (status) {
	case 2:
		cm.sendGetNumber("Did you bring the Christmas Decoration with you? Then please give me the #bChristmas Decoration#k you have. How many are you willing to give me?", 1, 1, 1000);
		break;
	case 3:
		if (cm.getPlayer().itemQuantity(4001473) < selection) {
			cm.sendOk("Please come back with some Christmas Decoration.");
			cm.dispose();
			return;
			}
			cm.gainItem(4001473, -selection);
			cm.getChannelServer().getFireWorks().giveDecs(cm.getPlayer(), selection)
			cm.sendOk("Thank you for the Christmas Decoration.");
			break;
	case 4:
		cm.dispose();
}
}

function action1(mode, type, selection) {
	switch (status) {
	case 2:
		cm.sendOk("#eStatus of the tree's growth \r\n#B" + cm.getChannelServer().getFireWorks().getDecsPercentage() + "# \r\nIf we collect them all, the tree would grow to it's fullest.");
		cm.dispose();
}
}