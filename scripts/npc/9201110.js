/*
	名字:	盜賊大師
	地圖:	團結的測試
	描述:	610030500
*/

function start() {
	if (cm.getPlayer().getMap().getId() == 610030000) {
		cm.sendOk("Once known as the 'Prince of Shadows', Grandmaster Ryo possessed supreme speed and power with short-ranged daggers and longer chain-like Claw. A part-time memeber of the Bosshunters, he was reowned for unparalleled ability to blend into the very nigth itself. His legend grew during a battle with Crimson Balrog, where he moved so swiftly that Balrog's attacks only caught air. Ryo also performed occasional 'retrievals' for those less fortunate than himself.");
		cm.dispose();
		return;
		}
	if (cm.getPlayer().getMap().getId() == 610030500) {
		cm.sendOk("As every Thief knows, the best attack is the one you never see coming. So, to best illustrate this, you'll be in a chamber with platforms and ledges that you can only get to with Haste, as well as All-Seeing Eyes that your dagger or claw must close--permanently. After all the All-Seeing Eyes have been eliminated, get ti the Thief Statue and lay claim to the Primal Claw! Good luck!");
		cm.dispose();
		return;
		}
		var eim = cm.getPlayer().getEventInstance();
	if (cm.getPlayer().getMap().getReactorByName("thief0").getState() > 0 && cm.getPlayer().getMap().getReactorByName("thief1").getState() > 0 && cm.getPlayer().getMap().getReactorByName("thief2").getState() > 0 && cm.getPlayer().getMap().getReactorByName("thief3").getState() > 0 && cm.getPlayer().getMap().getReactorByName("thief4").getState() > 0) {
	if (eim.getProperty("stage5_4") == null) {
	if (cm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.ETC).getNumFreeSlot() < 1) {
		cm.sendOk("Make room on your ETC inventory first.");
		cm.dispose();
		return;
		}
		cm.sendOk("You have proven your power, and lay claim to the Primal Claw. You must place this weapon on the appropriate arm of the Altar of Mastery to proceed.");
		eim.setProperty("stage5_4", 1);
		cm.gainItem(4001256, 1);
		cm.dispose();
		return;
		}
		cm.sendOk("You've already claimed the Staff of First Magic.");
		cm.dispose();
		return;
		}
		cm.sendOk("The All Seeing Eyes continue to watch your every move.");
		cm.dispose();
}