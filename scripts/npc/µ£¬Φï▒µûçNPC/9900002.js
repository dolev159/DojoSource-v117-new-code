/*
	名字:	楓之谷GM
	地圖:
	描述:
*/

var maps =[910001000, 100000000, 101000000, 102000000, 103000000, 104000000, 105000000, 120000000, 120030000, 130000000, 140000000, 101050000, 106020000, 200000000, 211000000, 211060000, 220000000, 221000000, 222000000, 230000000, 240000000, 250000000, 251000000, 260000000, 261000000, 270000100, 271000000, 300000000, 310000000, 540000000, 541000000, 541020000, 550000000, 551000000, 600000000, 801000000];

var Blue = "#fUI/StatusBar.img/base/iconBlue#";
var Red = "#fUI/StatusBar.img/base/iconRed#";

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
		var chat = "Hello, I can provide simple services here#r";
		chat += "\r\n#L0#City move";
		chat += "\r\n#L1#Brush props";
		chat += "\r\n#L2#View map monsters";
		chat += "\r\n#L3#Free teleportation";
		chat += "\r\n#L4#Test specific";
		cm.sendSimple(chat);
		break;
	case 1:
		if (selection == 0) {
                		var chat = "#bMay I ask where you want to go.\r\n";
			for (var i = 0; i < maps.length; i++) {
			chat += "#L" + i + "#" + (i % 2 == 0 ? Blue : Red) + "#m" + maps[i] + "##l\r\n";
			}
                		cm.sendSimple(chat);
			}
		if (selection == 1) {
			cm.sendGetNumber("May I ask what items are needed for assistance? \r\n\r\n	#e#dPlease enter the item ID code", 0, 1000000, 9999999);
			}
		if (selection == 2) {
			if (cm.getMap().getAllMonstersThreadsafe().size() < 1) {
			cm.sendOk("Sorry, there are no monsters on the current map.");
			cm.dispose();
			return;
			}
			var selStr = "Please select the monster you want to view. \r\n\r\n#b";
			var iz = cm.getMap().getAllUniqueMonsters().iterator();
			while (iz.hasNext()) {
				var zz = iz.next();
				selStr += "#L" + zz + "##o" + zz + "##l\r\n";
				}
				cm.sendSimple(selStr);
				}
		if (selection == 3) {
			var prompt = "#dEnter the target map ID. #k#b";
			cm.sendGetNumber(prompt, 1, 1, 999990000)
			}
		if (selection == 4) {
			//cm.spawnMonster(4230112,200); 
			//cm.warp(211070000, 2);
			//cm.forceStartQuest(3345);
			//cm.getPlayer().addFame(-5);
			//cm.getPlayer().setFame(cm.getPlayer().getFame() - 5);
			//cm.forceCompleteQuest(22402);
			//cm.ShowWZEffect("UI/tutorial/mersedes/0", 1);
			//cm.spawnNpc(9901000,25,485);//鴻亞
			//cm.teachSkill(80001000, 1, 1);
			//cm.spawnMonster(9400408,1);
			cm.dispose();
			}
			select = selection;
			break;
	case 2:
		if (select == 0) {
			cm.warp(maps[selection]);
			cm.dispose();
			}
		if (select == 1) {
			itemid = selection;
			cm.sendGetNumber("#v" + itemid + ":##t" + itemid + "#\r\n\r\nPlease enter the quantity unit of the item you want to obtain.", 1, 1, 1000);
			break;
			}
		if (select == 2) {
			cm.sendNext(cm.checkDrop(selection));
			cm.dispose();
			}
		if (select == 3) {
			cm.warp(selection);
			cm.dispose();
			}
			break;
	case 3:
		if (select == 1) {
			qty = selection;
			cm.gainItem(itemid, qty);
			}
			cm.dispose();
}
}