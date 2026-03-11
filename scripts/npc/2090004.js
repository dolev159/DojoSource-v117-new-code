/*
	名字:	桃醫仙
	地圖:	桃花仙境
	描述:	250000000
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
		if (status < 3) {
		cm.sendNext("Okay. Please take your time before making the decision.");
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
		cm.sendSimple("I have many talents. Tell me what you want. \r\n#L0##bLet's make medicine.#l\r\n#L1#I want to give up restoring scrolls...#l");
		break;
	default:
		if (status == 1 && type == 5) select = selection;
		reactor = 'action' + select;
		eval(reactor)(mode, type, selection);
}
}

function action0(mode, type, selection) {
	switch (status) {
	case 1:
		if (cm.getPlayer().itemQuantity(4161030) < 1) {
			cm.sendNext("lf you want to make a medicine, you'll need to first studythe formulas.There's nothing more dangerous thanhaving someone who is not knowledgeable on medicineformulas make one.");
			cm.dispose();
			return;
			}
			var chat = "What kind of medicine would you like to make?#b"
			items = [2022145, 2022146, 2022147, 2022148, 2022149, 2022150, 2050004, 4031554];
			for (var i = 0; i < items.length; i++)
			chat += "\r\n#L" + i + "##z" + items[i] + "##l";
			cm.sendSimple(chat);
			break;
	case 2:
		selectItem = selection;
		matSet = [[2022116], [2022116], [4000281, 4000293], [4000276, 2002005], [4000288, 4000292], [4000295], [2022131, 2022132], [4000286, 4000287, 4000293]];
		matSetQty = [[3], [3], [10, 10], [20, 1], [20, 20], [10], [1, 1], [20, 20, 20]];
		costSet = [0, 0, 910, 950, 1940, 600, 0, 0];

		item = items[selectItem];
		mat = matSet[selectItem];
		matQty = matSetQty[selectItem];
		cost = costSet[selectItem];

		var chat = "You want to make #b#t" + item + "##k? In order to make #t" + item + "#, You'll need ";
		for (var i = 0; i < mat.length; i++)
		chat += "#b" + matQty[i] + " #t" + mat[i] + "##k, ";
		chat += cost > 0 ? "and #b" + cost + " mesos#k.\r\n" : "\r\n";
		for (var i = 0; i < mat.length; i++)
		chat += "\r\n#v" + mat[i] + "# " + matQty[i] + " #t" + mat[i] + "#";
		chat += cost > 0 ? "\r\n#v4031138#" + cost + " mesos" : "";
		chat += "\r\n\r\nAre you sure you want to make it?";
		cm.sendYesNo(chat);
		break;
	case 3:
		if (cm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.USE).getNumFreeSlot() < 1) {
			cm.sendOk("Check to see if you have any empty slots in your Use tab.");
			cm.dispose();
			return;
			}
			for (var i = 0; i < mat.length; i++)
		if (cm.getPlayer().itemQuantity(mat[i]) < matQty[i] || cm.getPlayer().getMeso() < cost) {
			var chat = "Making #t" + item + "# requires ";
			for (var i = 0; i < mat.length; i++)
			chat += "#b#t" + mat[i] + "# x" + matQty[i] + "#k, ";
			chat += cost > 0 ? "and #b" + cost + " mesos#k." : "";
			chat += "\r\n#e - Materials Needed#n\r\n";
			for (var i = 0; i < mat.length; i++)
			chat += "\r\n#t" + mat[i] + "# #r" + cm.getPlayer().itemQuantity(mat[i]) + " / " + matQty[i] + "#k";
			cm.sendOk(chat);
			cm.dispose();
			return;
			}
			for (var i = 0; i < mat.length; i++)
			cm.gainItem(mat[i], -matQty[i]);
			if (cost > 0) cm.gainMeso(-cost);
			cm.gainItem(item, 1);
			cm.dispose();
}
}

function action1(mode, type, selection) {
	switch (status) {
	case 1:
		if (cm.getPlayer().itemQuantity(4220151)) {
		if (cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(21742)).getStatus() == 1) {
			cm.sendNext("Oh? Was the scroll restoration too difficult? Well, its easier for me if you just quit. Please forfeit the quest and give the scroll back to me.");
			cm.dispose();
			return;
			}
			cm.sendNext("Thanks for returning the scroll to me. If you ever want to try again, come talk to me.");
			cm.gainItem(4220151, -1);
			}
			cm.dispose();
}
}