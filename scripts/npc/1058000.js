/*
	名字:	修里
	地圖:	鍛煉室2
	描述:	103050520
*/

function start() {
	if (cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(2607)).getStatus() != 1) {
		cm.getClient().getSession().write(Packages.tools.packet.CWvsContext.serverNotice(5, "The Owl just doesn't seem interested..."));
		cm.dispose();
		return;
		}
                if (cm.getPlayer().getPosition().x > -1090 || cm.getPlayer().getPosition().y > -222) {
		cm.getClient().getSession().write(Packages.tools.packet.CWvsContext.serverNotice(5, "You're too far away to talk to the Owl."));
		cm.dispose();
		return;
		}
	if (cm.getPlayer().itemQuantity(4033178)) {
		cm.getClient().getSession().write(Packages.tools.packet.CWvsContext.serverNotice(5, "The Owl has given you everything it intends to give you."));
		cm.dispose();
		return;
		}
	if (cm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.ETC).getNumFreeSlot() < 1) {
		cm.getClient().getSession().write(Packages.tools.packet.CWvsContext.serverNotice(5, "You don't have enough space for the Owl's Proof of Training."));
		cm.dispose();
		return;
		}
		cm.sendNext("(The Owl passes you a seal, a look of utmost indifference on his face. Then it flaps its wings and shoos you away.)");
		cm.gainItem(4033178, 1);
		cm.dispose();
}