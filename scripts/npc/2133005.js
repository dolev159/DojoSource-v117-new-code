/*
	名字:	洞穴入口
	地圖:	岩石山洞穴
	描述:	300010410
*/

function start() {
	cm.sendYesNo("You sense something inside the dark cave. Do you want to enter?");
}

function action(mode, type, selection) {
	if (mode > 0) {
		if (cm.getMap(300010420).getCharacters().size() < 1) {
			cm.getMap(300010420).resetFully();
			cm.getPlayer().changeMap(cm.getMap(300010420), cm.getMap(300010420).getPortal(1));
			cm.getPlayer().startMapTimeLimitTask(420, cm.getMap(300010400));
			cm.dispose();
			return;
			}
			cm.getClient().getSession().write(Packages.tools.packet.CWvsContext.serverNotice(5, "Try again soon."));
			}
			cm.dispose();
}