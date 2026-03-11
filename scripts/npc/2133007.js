/*
	名字:	艾畢奈亞
	地圖:	女王的藏身處
	描述:	300030310
*/

function start() {
	cm.sendYesNoS("Ha! Insignificant whelp. Leave now if you value your life. You'll be gone soon enough anyway...", 4);
}

function action(mode, type, selection) {
	switch (mode) {
	case 0:
		cm.sendOkS("So be it. If you crave your doom, I will grant it.", 4);
		break;
	case 1:
		cm.getPlayer().changeMap(cm.getMap(300000010), cm.getMap(300000010).getPortal(0));
		}
		cm.dispose();
}