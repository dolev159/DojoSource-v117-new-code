/*
	名字:	寶箱
	地圖:	納希沙漠寶物倉庫
	描述:	915010101
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
		if (cm.getPlayer().getJob() != 2410) {
			cm.getClient().getSession().write(Packages.tools.packet.CWvsContext.serverNotice(5, "You must be on your 2nd job to take on another Job Advancement."));
			cm.dispose();
			return;
			}
		if (cm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.EQUIP).getNumFreeSlot() < 1) {
			cm.getClient().getSession().write(Packages.tools.packet.CWvsContext.serverNotice(5, "Either my Equip tab is full or I already put it in there."));
			cm.dispose();
			return;
			}
			cm.gainItem(1142377, 1);
			cm.getPlayer().changeJob(2411);
			Packages.server.quest.MapleQuest.getInstance(25113).forceStart(cm.getPlayer(), 0, 1);
			cm.sendNextS("I have really got to get myself organized. Half of this stuff should have gone in a refrigerator... Oh, wait! There it is. It's time for a job advancement!", 3);
			break;
	case 1:
		cm.dispose();
}
}