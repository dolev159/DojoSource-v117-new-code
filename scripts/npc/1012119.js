/*
	名字:	王年海
	地圖:	芽孢山丘
	描述:	100020000
*/

var map = 910060000;

var text = ["Courage", "Wisdom", "Skill", "Training", "Power"];

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
		status--;
		break;
	case 1:
		status++;
		break;
		}
		reactor = 'action' + (cm.getPlayer().itemQuantity(4032457) ? 1 : 0);
		eval(reactor)(mode, type, selection);
}

function action0(mode, type, selection) {
	switch (status) {
	case 0:
		if (cm.getPlayer().getLevel() > 20) {
			cm.sendOk("This training ground is available only for those under level 20.");
			cm.dispose();
			return;
			}
			var chat = "#b#e[Notice]#n#k \r\nListen up, explorers! \r\nThis training center is only open to Bowman below Level 20. You can always train on your own, but it helps to train with likeminded people together. Select the room you would like to train in.. #b";
		for (var i = 0; i < 5; i++)
			chat += "\r\n#L" + i + "#Room of " + text[i] + " (" + cm.getMap(map + i).getCharacters().size() + "/" + 5 + ")#l";
			cm.sendSimple(chat);
			break;
	case 1:
		if (cm.getMap(map + selection).getCharacters().size() < 5) {
			cm.getPlayer().changeMap(cm.getMap(map + selection), cm.getMap(map + selection).getPortal(1));
			cm.dispose();
			return;
			}
			cm.sendNext("This training center is full.");
			cm.dispose();
}
}

function action1(mode, type, selection) {
	switch (status) {
	case 0:
		cm.sendYesNo("So you have a Certificate of Training. I suppose you're authorized to use my Training Center. Do you want to enter the Training Center now?");
		break;
	case 1:
		cm.getPlayer().changeMap(cm.getMap(map), cm.getMap(map).getPortal(0));
		cm.dispose();
}
}