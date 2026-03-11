/*
	名字:	超級美女
	地圖:	考場
	描述:	744000008
*/

var puzzle = ["11 + 48 x 37 + 28", "28 + 20 x 21 +23", "34 + 31 x 22 +37", "40 + 13 x 14 + 16", "45 + 31 x 14 +28", "16 + 27 x 11 + 14", "37 + 43 x 49 + 10", "34 + 21 x 27 + 39", "24 + 16 x 28 + 38", "16 + 30 x 40 + 28", "37 + 45 x 39 +48", "49 + 17 x 22 + 29", "30 + 45 x 34 + 30", "43 + 21 x 49 + 20", "39 + 12 x 31 +13", "28 + 47 x 22 +23", "50 + 23 x 48 + 24", "45 + 49 x 35 + 34", "22 + 21 x 45 + 12"];

var answer =  ["1815", "471", "753", "238", "507", "327", "2154", "640", "510", "1244", "1840", "452", "1590", "1092", "424", "1085", "1178", "1794", "979"];

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
	switch (status) {
	case 0:
		if (cm.getPlayer().getEventInstance().getProperty(cm.getPlayer().getMap().getId()) != null) {
			cm.dispose();
			return;
			}
			for (var i = 0; i < 14; i++) {
		if (cm.getPlayer().getMap().getId() == cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(28921)).getCustomData().substring(i + "0", i + "9")) {
			y = i + 1;
			}
			}
			num = Math.floor(Math.random() * 19);
			cm.sendGetNumber("" + puzzle[num] + " = ? \r\n", 1, 1, 3000);
			break;
	case 1:
		if (selection != answer[num]) {
			cm.sendOk("Ha! You're a dummy! Dummy dummy dummy!");
			cm.dispose();
			return;
			}
			cm.sendNextS("Correct! You get a point, so you pass!", 1);
			break;
	case 2:
		cm.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.sendFourPillarsOfHeaven(y, false));
		cm.getMap().broadcastMessage(Packages.tools.packet.CField.environmentChange("MapleHighSchool/clear", 3));
		cm.getPlayer().getEventInstance().setProperty(cm.getPlayer().getMap().getId(), 1);
		cm.dispose();
}
}