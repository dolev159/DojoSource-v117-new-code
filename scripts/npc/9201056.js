/*
	名字:	新葉城計程車
	地圖:	新葉城-市區中心
	描述:	600000000
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
		cm.sendNext("If you change your mind, I'll be right here.");
		cm.dispose();
		return;
		}
		status--;
		break;
	case 1:
		status++;
		break;
		}
		reactor = 'action' + (cm.getPlayer().getMap().getId() == 600000000 ? 0 : 1);
		eval(reactor)(mode, type, selection);
}

function action0(mode, type, selection) {
	switch (status) {
	case 0:
		cm.sendYesNo("Hey, there. Want to take a trip deeper into the Masterian wilderhess? A lot of this continent is still quite unknown and untamed... so there's still not much in the way of roads. Good thing we've got this baby.:. we can go offroading, and in style too! Right. now, l can drive you to the #bPhantom Forest#k. The old #bPrendergast Mansion#k is located there. Some people say the place is haunted! What do you say... want to head over there.");
		break;
	case 1:
		cm.sendNext("Alright! Buckle your seat belt, and let's head to the Mansion! It's gonna get bumpy!");
		break;
	case 2:
		cm.getPlayer().changeMap(cm.getMap(682000000), cm.getMap(682000000).getPortal(0));
		cm.dispose();
}
}

function action1(mode, type, selection) {
	switch (status) {
	case 0:
		cm.sendYesNo("Hey, there: Hope you had fun here. Ready to head back to NLC?");
		break;
	case 1:
		cm.sendNext("Back to civilization it is! Hop in and get comfortable back there... we'll have you back to the city in a jiffy!");
		break;
	case 2:
		cm.getPlayer().changeMap(cm.getMap(600000000), cm.getMap(600000000).getPortal(0));
		cm.dispose();
}
}