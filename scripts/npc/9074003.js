/*
	名字:	季節連作： 秋
	地圖:	休菲凱曼畫廊
	描述:	956000000
*/

var map = 956030000;

var num = 10;

function start() {
	cm.sendYesNo("Something inside the painting is tugging at you. Will you let it pull you inside?");
}

function action(mode, type, selection) {
	if (mode > 0) {
		for (var i = 0; i < num; i++)
	if (cm.getMap(map + i + (i * 100)).getCharacters().size() < 1) {
		cm.getEventManager("GonzoGallery").startInstance(cm.getPlayer());
		cm.getClient().getSession().write(Packages.tools.packet.CWvsContext.serverNotice(5, "Spiegelmann's adorable tiger seems to be sucking you into the painting!"));
		cm.getPlayer().changeMap(cm.getMap(map + i), cm.getMap(map + i).getPortal(0));
		cm.dispose();
		return;
		}
		cm.getClient().getSession().write(Packages.tools.packet.CWvsContext.serverNotice(5, "Try again soon."));
		}
		cm.dispose();
}