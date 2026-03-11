/*
	名字:	未發表作品
	地圖:	休菲凱曼畫廊
	描述:	956000000
*/

var map = 956050000;

var num = 10;

function start() {
	cm.sendYesNo("This painting is brimming with bizarre energy. Will you go inside the painting?");
}

function action(mode, type, selection) {
	if (mode > 0) {
		if (cm.getPlayer().itemQuantity(4001690) < 4) {
			cm.sendNext("You need 4 #bPainting Scraps#k to enter this area.");
			cm.dispose();
			return;
			}
			for (var i = 0; i < num; i++)
		if (cm.getMap(map + i).getCharacters().size() < 1) {
			cm.getEventManager("GonzoGallery").startInstance(cm.getPlayer());
			cm.getClient().getSession().write(Packages.tools.packet.CWvsContext.serverNotice(5, "The Dark Gallery painting is drawing you in!"));
			cm.getPlayer().changeMap(cm.getMap(map + i), cm.getMap(map + i).getPortal(0));
			cm.gainItem(4001690, -4);
			cm.dispose();
			return;
			}
			cm.getClient().getSession().write(Packages.tools.packet.CWvsContext.serverNotice(5, "Try again soon."));
			}
			cm.dispose();
}