/*
	名字:	戰士大師
	地圖:	團結的測試
	描述:	610030500
*/

function start() {
	if (cm.getPlayer().getMap().getId() == 610030000) {
		cm.sendOk("A legendary family of heroes, the de Vrisiens are the original founders of the Stormcasters. The family is unique, as each son or daughter inherits the full fighting techniques of their ancestors. This ability has proven to be immensely useful; as it allows for nearly unlimited strategy, improvisation and tactics to defeat all enemies. A true family for the generations.");
		cm.dispose();
		return;
		}
	if (cm.getPlayer().getMap().getId() == 610030500) {
		cm.sendOk("Unbelievable strength and power, anyone can be achieve. But what makes a warrior special is their iron will. No matter the odds, a true warrior pushes through until victory is assured. Thus, the Warrior Chamber is a brutal road where the room itself is against you, as well as the ultra-strong monsters within. Use your skills to shake off the effects and defeat the monsters within to reach the Warrior Statue and claim the Master Sword. Good luck!");
		cm.dispose();
		return;
		}
		var eim = cm.getPlayer().getEventInstance();
	if (cm.getPlayer().getMap().getAllMonstersThreadsafe().size() < 1) {
	if (eim.getProperty("stage5_1") == null) {
	if (cm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.ETC).getNumFreeSlot() < 1) {
		cm.sendOk("Make room on your ETC inventory first.");
		cm.dispose();
		return;
		}
		cm.sendOk("You have proven your power and lay claim to the Master Sword. You must place this weapon on the appropriate arm of the Altar of Mastery to proceed.");
		eim.setProperty("stage5_1", 1);
		cm.gainItem(4001259, 1);
		cm.dispose();
		return;
		}
		cm.sendOk("You've already claimed the Master Sword.");
		cm.dispose();
		return;
		}
		cm.sendOk("Eliminate all of the Crimson Guardians.");
		cm.dispose();
}