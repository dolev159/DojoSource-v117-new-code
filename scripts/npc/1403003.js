/*
	名字:	畫像
	地圖:	神木村寶物倉庫
	描述:	915010201
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
		if (cm.getPlayer().getJob() != 2411) {
			cm.getClient().getSession().write(Packages.tools.packet.CWvsContext.serverNotice(5, "You must be on your 3rd job to take on another Job Advancement."));
			cm.dispose();
			return;
			}
		if (cm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.EQUIP).getNumFreeSlot() < 1) {
			cm.getClient().getSession().write(Packages.tools.packet.CWvsContext.serverNotice(5, "Either my Equip tab is full or I already put it in there."));
			cm.dispose();
			return;
			}
			cm.gainItem(1142378, 1);
			cm.getPlayer().changeJob(2412);
			Packages.server.quest.MapleQuest.getInstance(25124).forceStart(cm.getPlayer(), 0, 1);
			cm.sendNextS("You always wore that silly little smile to make your advisors think everything was all right. You always were too concerned about everybody else... And now you give me the skill book I was looking for. What a dear.", 3);
			break;
	case 1:
		cm.dispose();
}
}