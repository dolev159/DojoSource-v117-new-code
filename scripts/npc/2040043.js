/*
	名字:	藍氣球
	地圖:	遺棄之塔&amp;lt;第5階段&gt;
	描述:	922010800
*/

var status;

var puzzle = ["30*10+98", "3*8+610", "69+420", "400+140-72", "50*10+80-4", "5*60+5*5", "900/2+3", "20*20+15", "20*30+15", "9*9+100-43"];

var answer = ["001000011", "001101000", "000100011", "000101010", "000011100", "011010000", "001110000", "100110000", "100011000", "101000010"];

var problem = false;

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
		eim = cm.getPlayer().getEventInstance();
		reactor = 'action' + (cm.getPlayer().getParty().getLeader().getId() != cm.getPlayer().getId() ? 0 : eim.getProperty("stage5") == null || problem? 1 : eim.getProperty("stage5") == 0 ? 2 : 3);
		eval(reactor)(mode, type, selection);
}

function action0(mode, type, selection) {
	switch (status) {
	case 0:
		cm.sendNext("In the fifth stage, you will find a number of platforms. Of these platforms, #b3 are connected to the portal that leads to the next stage. 3 members of your party must stand in the center of these 3 platforms#k. \r\nRemember, exactly 3 members must be on a platform. No more, no less. While they are on the platform, the party leader must #bdouble-click on me to check whether the members have chosen the right platform#k. Good luck!");
		cm.dispose();
}
}

function action1(mode, type, selection) {
	switch (status) {
	case 0:
		cm.sendNext("In the fifth stage, you will find a number of platforms. Of these platforms, #b3 are connected to the portal that leads to the next stage. 3 members of your party must stand in the center of these 3 platforms#k. \r\nRemember, exactly 3 members must be on a platform. No more, no less. While they are on the platform, the party leader must #bdouble-click on me to check whether the members have chosen the right platform#k. Good luck!");
		break;
	case 1:
		if  (problem == false) {
			eim.setProperty("stage5", 0);
			num = Math.floor(Math.random() * 10);
			eim.setProperty("stage5a", num);
			problem = true;
			}
			cm.sendNextPrev("The #rthree numbers in the answer to my question are the key to opening the portal to the next stage. \r\n#r" + puzzle[num] + " = ?#k \r\nPlease find the correct answer.");
			break;
	case 2:
		cm.getPlayer().getMap().startMapEffect("" + puzzle[num] + " = ?", 5120018);
		cm.dispose();
}
}

function action2(mode, type, selection) {
	switch (status) {
	case 0:
			chenhui = 0;
			for (var i = 0; i < 9; i++)
		if (cm.getPlayer().getMap().getNumPlayersItemsInArea(i) > 0) {
			chenhui++;
			}
		if (chenhui != 3) {
			cm.sendNext("You haven't found the 3 correct platforms yet. Do you remember the question? I'll tell you again. \r\n#r" + puzzle[eim.getProperty("stage5a")] + " = ?#k \r\nRemember that only 3 party members should be on a platform, and they need to be standing in the center of the platform in order to be considered correct. Good luck!");
			cm.dispose();
			return;
			}
			var x = "";
			for (var i = 0; i < 9; i++)
			x += cm.getPlayer().getMap().getNumPlayersItemsInArea(i);
			y = x;
		if (y == answer[eim.getProperty("stage5a")]) {
			eim.setProperty("stage5", 1);
			cm.getPlayer().getMap().broadcastMessage(Packages.tools.packet.CField.environmentChange("gate", 2));
			cm.getPlayer().getMap().broadcastMessage(Packages.tools.packet.CField.environmentChange("quest/party/clear", 3));
			cm.getPlayer().getMap().broadcastMessage(Packages.tools.packet.CField.environmentChange("Party1/Clear", 4));
			cm.dispose();
			return;
			}
			cm.getPlayer().getMap().broadcastMessage(Packages.tools.packet.CField.environmentChange("quest/party/wrong_kor", 3));
			cm.getPlayer().getMap().broadcastMessage(Packages.tools.packet.CField.environmentChange("Party1/Failed", 4));
			cm.dispose();
}
}

function action3(mode, type, selection) {
	switch (status) {
	case 0:
		cm.sendNext("Congratulations on clearing the quests for this stage. Please use the portal you see over there and move on to the next stage.");
		cm.dispose();
}
}