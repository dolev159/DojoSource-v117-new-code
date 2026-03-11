/*
	名字:	紫氣球
	地圖:	時空的裂縫
	描述:	922010900
*/

function start() {
	var eim = cm.getPlayer().getEventInstance();
	if (eim.getProperty("stage9") == null) {
		cm.sendNext("Now that you've come this far, it's time to defeat the one responsible for this mess, #b#o9300012##k. I suggest you be careful, though, as he is not in a very good mood. If you and your party members defeat him, the Dimensional Schism will close forever. I'm counting on you!");
		cm.dispose();
		return;
		}
		cm.sendNext("You've defeated #b#o9300012##k! Magnificent! Thanks to you, the Dimensional Schism has been safely closed. I will now help you leave this place.");
}

function action(mode, type, selection) {
	if (mode > 0)
		cm.getPlayer().changeMap(cm.getMap(922011100), cm.getMap(922011100).getPortal(0));
		cm.dispose();
}