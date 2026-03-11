/*
	名字:	武公下戰帖
	地圖:	桃花仙境寺院
	描述:	250000100
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
		cm.sendNext("#b(The mysterious aura disappeared as soon as you took your hand off the notice.)");
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
		cm.sendSimple("#e<Notice >#n \r\nIf you are young and confident, come to Mu Lung Dojo. \r\n-Mu Gong-\r\n#L0##bEnter Mu Lung Dojo.#l\r\n#L1#Read the notice more carefully.#l");
		break;
	case 1:
		if (selection < 1)
			cm.sendYesNo("#b(You place your hand on the notice and a mysterious aura envelops you.)#k\r\n\r\nWill you move to Mu Lung Dojo?");
		if (selection > 0) {
			cm.sendOk("#e<Notice: Take the challenge! >#n \r\nI am Mu Gong, the master of Mu Lung Dojo. I started training in Mu Lung long ago to become a hermit, and have reached a new level of enlightenment. Mu Lung Dojo is my challenge to the world, to find the strength to reach my level. But do not take this challenge lightly, for I will show no mercy to the weak!");
			cm.dispose();
			}
			break;
	case 2:
		cm.getPlayer().changeMap(cm.getMap(925020000), cm.getMap(925020000).getPortal(4));
		cm.dispose();
}
}