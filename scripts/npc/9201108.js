/*
	名字:	弓箭手大師
	地圖:	團結的測試
	描述:	610030500
*/

function start() {
	if (cm.getPlayer().getMap().getId() == 610030000) {
		cm.sendOk("One of the only known Holy Archers, Lockewood is one of the Keep's most famous heroes. Of particular note is his custom white and gold battle barb, said to be blessed by a powerfull goddess. His aim was tremendously accurate over long distanes. Feared and respected for his 'Genesis Arrow' and 'Doom Phoenix', he once struck down six Typhons from the Valley of Heroes.");
		cm.dispose();
		return;
		}
	if (cm.getPlayer().getMap().getId() == 610030500) {
		cm.sendOk("A legendary creature known as the Master Guardian awaits you. It was a Crimson Guardian that Ridley once experimented on, which resulted in its becoming highly resistant to magic attacks, spears, maces, everything--except arrows fired with exceptional power. Bowmen and women! As undisputed masters of the Bow and Arrow, you must use your most powerful attacks--everything from Strafe to Hurricane to Piercing Arrow to destroy this powerful creature and reach the Bowman Statue to claim The Ancestral Bow! Good luck!");
		cm.dispose();
		return;
		}
		var eim = cm.getPlayer().getEventInstance();
	if (cm.getPlayer().getMap().getAllMonstersThreadsafe().size() < 1) {
	if (eim.getProperty("stage5_3") == null) {
	if (cm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.ETC).getNumFreeSlot() < 1) {
		cm.sendOk("Make room on your ETC inventory first.");
		cm.dispose();
		return;
		}
		cm.sendOk("You have proven your power and lay claim to the Ancestral Bow. You must place this weapon on the approprlate arm of the Altar of Mastery to proceed.");
		eim.setProperty("stage5_3", 1);
		cm.gainItem(4001258, 1);
		cm.dispose();
		return;
		}
		cm.sendOk("You've already claimed the Ancestral Bow.");
		cm.dispose();
		return;
		}
		cm.sendOk("Your arrows must vanquish all foes before claiming the Ancestral Bow.");
		cm.dispose();
}