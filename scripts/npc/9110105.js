/*
	名字:	直助
	地圖:	城堡走廊
	描述:	800040211
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
		if (status < 2) {
		cm.sendNext("...See? What lies ahead is a treacherous path, one that's known to chew up and spilt out everyone that dare to go there. If I were you, I'd turn around and leave right now with my life in tact.");
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
		cm.sendNext("What are you...!?");
		break;
	case 1:
		cm.sendYesNo("What? You want to go where? Do you even know where this place is?");
		break;
	case 2:
		cm.sendNext("Fine. If you know what your're getting yourself into, l won't stop you. l just hope you stay sate so you can defeat the monsters!");
		break;
	case 3:
		cm.getPlayer().changeMap(cm.getMap(800040300), cm.getMap(800040300).getPortal(1));
		cm.dispose();
}
}