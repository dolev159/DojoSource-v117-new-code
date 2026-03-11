/*
	名字:	妖精 瑪麗
	地圖:	魔法森林
	描述:	101000000
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
		status--;
		break;
	case 1:
		status++;
		break;
		}
	switch (status) {
	case 0:
		cm.sendSimple("I'm Mar the Fairy, and I can transfer stats from an existing pet to a new pet. \r\n#L0##bI want to transfer pet stats to a new pet.#l\r\n#L1#I want to revive a pet.#l");
		break;
	case 1:
		if (selection < 1) {
			cm.sendOk("I do not think you have the Pet AP Reset Scroll or a pet for closeness to be transferred with you... Cloy from henesys would definitely know about the Pet AP Reset Scroll...");
			cm.dispose();
			return;
			}
			cm.sendNext("I'm #p1032102#, and I'm researching all kinds of magic here in #m101000000#. I've been studying life magic for centuries, but there's always more to learn, it seems! Ah, excuse me as I get back to my research, then...");
			cm.dispose();
}
}