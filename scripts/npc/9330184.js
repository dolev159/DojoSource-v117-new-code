/*
	名字:	驅魔道長
	地圖:	廢棄的教室
	描述:	744000006
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
		if (cm.getPlayer().getMap().getAllMonstersThreadsafe().size() > 0) {
			cm.sendNext("The zombies are still there! Vat are you dooooing?");
			cm.dispose();
			return;
			}
			cm.sendNext("Thank you for your help! I need to brush up on my necromancy! Blaah...");
			break;
	case 1:
		cm.sendNextPrev("I vill open the door now that the zombies are kaput!");
		break;
	case 2:
		for (var i = 0; i < 14; i++) {
		if (cm.getPlayer().getMap().getId() == cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(28921)).getCustomData().substring(i + "0", i + "9")) {
			y = i + 1;
			}
			}
			cm.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.sendFourPillarsOfHeaven(y, false));
			cm.getMap().broadcastMessage(Packages.tools.packet.CField.environmentChange("MapleHighSchool/clear", 3));
			cm.getPlayer().getEventInstance().setProperty(cm.getPlayer().getMap().getId(), 1);
			cm.dispose();
}
}