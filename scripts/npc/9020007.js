/*
	名字:	坎特
	地圖:	危海中心
	描述:	923040100
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
		if (status < 1) {
		cm.dispose();
		return;
		}
		if (status < 2) {
		cm.sendNext("Save me from the angry sea! And the angry critters in it!");
		cm.dispose();
		return;
		}
		status--;
		break;
	case 1:
		status++;
		break;
		}
	switch (status) {
	case 0:
		cm.sendSimple("You know what would be nice? If you could maybe not leave me to drown right now! \r\n#L0##bI hear you, I do, but I kinda need to go...#l");
		break;
	case 1:
		cm.sendYesNo("You want to leave already? What about me? There's lots of research and not being eaten to do!");
		break;
	case 2:
		cm.sendNext("So, I'm supposed to fight Pianus myself? Do I look like I can handle Pianus?");
		break;
	case 3:
		cm.getPlayer().changeMap(cm.getMap(923040000), cm.getMap(923040000).getPortal(0));
		cm.dispose();
}
}