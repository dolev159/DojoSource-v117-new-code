/*
	名字:	惡魔之門
	地圖:	大岩石路
	描述:	102020300
*/

var status;

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	switch (mode) {
	case -1:
		cm.dispose();
		return;
	case 0:
		status--;
		break;
	case 1:
		status++;
		break;
		}
	switch (status) {
	case 0:
		cm.sendNext("#r[Requirements to Enter] \r\n\r\n#b      1.You must be a Warrior, a Dawn warrior, or Aran.\r\n      2.You must be under Level 40.\r\n      3.You must have Andras' Emblem.");
		break;
	case 1:
		if (Math.floor(cm.getPlayer().getJob() / 100 % 10) != 1 || cm.getPlayer().getLevel() > 40 || cm.getPlayer().itemQuantity(4032491) < 1) {
			cm.dispose();
			return;
			}
			cm.sendNextPrev("You are permitted to enter the Demon's Doorway.");
			break;
	case 2:
		if (cm.getMap(677000004).getCharacters().size() > 0 || cm.getMap(677000005).getCharacters().size() > 0) {
			cm.getClient().getSession().write(Packages.tools.packet.CWvsContext.serverNotice(5, "Try again soon."));
			return false;
			}
			cm.getPlayer().changeMap(cm.getMap(677000004), cm.getMap(677000004).getPortal(2));
			cm.dispose();
}
}