/*
	名字:	雅典娜女神
	地圖:	雅典娜禁地&amp;lt;女神之祝福&gt;
	描述:	920011300
*/

function start() {
	if (cm.getPlayer().getMap().getId() == 920010100)
		cm.sendYesNo("Thank you for not only restoring the statue, but rescue me, Minerva, from the entrapment. May the blessing of the goddess be with you til the end...");
	else
		cm.sendYesNo("Thank you. I will show you the way out now. May you be ever blessed.");
}

function action(mode, type, selection) {
	if (mode > 0) {
		if (cm.getPlayer().getMap().getId() == 920010100) {
			cm.getPlayer().changeMap(cm.getMap(920011300), cm.getMap(920011300).getPortal(0));
			cm.dispose();
			return;
			}
		if (cm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.ETC).getNumFreeSlot() < 1) {
			cm.sendOk("In order to receive your reward, you need to have at least two empty slots in your Inventory ETC tab. Please talk to me after you make some room.");
			cm.dispose();
			return;
			}
		if (cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(1203)).getStatus() < 2) {
			Packages.server.quest.MapleQuest.getInstance(1203).forceComplete(cm.getPlayer(), 0);
			cm.getPlayer().getClient().getSession().write(Packages.tools.packet.CWvsContext.getShowQuestCompletion(1203));
			}
			cm.addTrait("will", 50);
			cm.addTrait("charm", 10);
			cm.gainItem(4001158, 1);
			cm.getPlayer().gainExp(cm.getPlayer().getLevel() * 500, true, true, true);
			cm.getPlayer().changeMap(cm.getMap(920011200), cm.getMap(920011200).getPortal(0));
			}
			cm.dispose();
}