/*
	名字:	魔法大師
	地圖:	團結的測試
	描述:	610030500
*/

function start() {
	if (cm.getPlayer().getMap().getId() == 610030000) {
		cm.sendOk("A name forever remembered, Rafael was an exceptionally skilled sorcerer, and the foremost master of mental magic powers, telekinesis and telepathy. In addition to that, he was one of the 'Elite Mages' who mastered all the elements. He was last seen looking for the 'Temple of the Elementals' to turn the tide against the invading Krakian Army...");
		cm.dispose();
		return;
		}
	if (cm.getPlayer().getMap().getId() == 610030500) {
		cm.sendOk("As a powerful Elite Mage, Ridly knew the value of intelligence, the hallmark quality of a wizard. Thus, the Mage Chamber is a twisting maze of devious conception--the Teleport skill is the only skill you can use inside to get around, and Magic Claw is the only skill that will break the statues. You must also kill numerous monsters within. After you solve the maze and defeat all the foes within it, deduce which Mage Statue hides the Staff of First Magic and break it open to claim it! Good luck!");
		cm.dispose();
		return;
		}
		var eim = cm.getPlayer().getEventInstance();
	if (eim.getProperty("stage5_2") == null) {
	if (cm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.ETC).getNumFreeSlot() < 1) {
		cm.sendOk("Make room on your ETC inventory first.");
		cm.dispose();
		return;
		}
		cm.sendOk("You have proven your power and lay claim to the Staff of First Magic. You must place this weapon on the appropriate arm of the Altar of Mastery to proceed.");
		eim.setProperty("stage5_2", 1);
		cm.gainItem(4001257, 1);
		cm.dispose();
		return;
		}
		cm.sendOk("You've already claimed the Staff of First Magic.");
		cm.dispose();
}