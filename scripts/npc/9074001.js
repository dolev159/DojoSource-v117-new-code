/*
	名字:	季節連作： 春
	地圖:	休菲凱曼畫廊
	描述:	956000000
*/

var map = 956010000;

var num = 10;

function start() {
	cm.sendYesNo("Something inside the painting is tugging at you. Will you let it pull you inside?");
}

function action(mode, type, selection) {
	if (mode > 0) {
		for (var i = 0; i < num; i++)
	if (cm.getMap(map + i + (i * 100)).getCharacters().size() < 1) {
		cm.getEventManager("GonzoGallery").startInstance(cm.getPlayer());
		cm.getClient().getSession().write(Packages.tools.packet.CWvsContext.serverNotice(5, "Spiegelmann's bright smile seems to be sucking you into the painting!"));
		cm.getPlayer().changeMap(cm.getMap(map + 100 + i), cm.getMap(map + 100 + i).getPortal(0));
		cm.dispose();
		return;
		}
		cm.getClient().getSession().write(Packages.tools.packet.CWvsContext.serverNotice(5, "Try again soon."));
		}
		cm.dispose();
}