/*
	名字:	雪莉
	地圖:	維修中的列車
	描述:	931050400
*/

function start() {
	if (cm.getPlayer().getPosition().x > 0) { 
		cm.sendOkS("Help me!", 4);
		cm.dispose();
		return;
		}
		cm.sendYesNoS("Help me! Don't just walk away!", 4);
}

function action(mode, type, selection) {
	switch (mode) {
	case 0:
		cm.sendNextS("Help! Please!", 4);
		break;
	case 1:
		cm.getPlayer().changeMap(cm.getMap(103020000), cm.getMap(103020000).getPortal(2));
		}
		cm.dispose();
}