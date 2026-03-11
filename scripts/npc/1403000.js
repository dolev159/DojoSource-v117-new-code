/*
	名字:	小抽屜
	地圖:	天空之城寶物倉庫
	描述:	915010001
*/

var job = true;

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
		if (job) {
		if (cm.getPlayer().getJob() != 2400) {
			cm.getClient().getSession().write(Packages.tools.packet.CWvsContext.serverNotice(5, "You are not 1st job Phantom."));
			cm.dispose();
			return;
			}
		if (cm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.EQUIP).getNumFreeSlot() < 1) {
			cm.getClient().getSession().write(Packages.tools.packet.CWvsContext.serverNotice(5, "Either my Equip tab is full or I already put it in there."));
			cm.dispose();
			return;
			}
			job = false;
			cm.gainItem(1142376, 1);
			cm.getPlayer().changeJob(2410);
			Packages.server.quest.MapleQuest.getInstance(25103).forceStart(cm.getPlayer(), 0, 1);
			}
			cm.sendNextS("Let's see... 'A History of Ribbon Pigs' first edition... that's not it. 'The Great Mushroom Uprising'... why did I even steal this? Ah, there we are! I'll be back to my old self in no time!", 3);
			break;
	case 1:
		cm.sendNextPrevS("Judgment Draw was in here as well? Lucky me! I believe that one will show up in the... Beginner Skill window?", 3);
		break;
	case 2:
		cm.dispose();
}
}