/*
	名字:	隱藏的文件
	地圖:	猶利塔的實驗室2
	描述:	926130102
*/

function start() {
	if (cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(3367)).getStatus() != 1) {
		cm.dispose();
		return;
		}
	if (cm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.ETC).getNumFreeSlot() < 1) {
		cm.getClient().getSession().write(Packages.tools.packet.CWvsContext.serverNotice(5, "You can't carry any more because you're carrying too much."));
		cm.dispose();
		return;
		}
		y = cm.getNpcob().getObjectId() % 30;
		progress = cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(3367)).getCustomData();
	if ((progress >> y) % 2 == 0) {
		progress |= (1 << y);
		cm.gainItem(4031797, 1);
		cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(3367)).setCustomData(progress);
		}
		cm.dispose();
}