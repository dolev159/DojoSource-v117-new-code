/*
	名字:	阿達尼斯
	地圖:	冰原雪域
	描述:	211000000
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
		if (type == 5) {
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
		cm.sendSimple("\r\n#L0##bI'd like to perform a Liberation Ritual#l\r\n\r\n#L1#I think I found a strange type of stone.#l");
		break;
	default:
		if (status == 1 && type == 5) select = selection;
		reactor = 'action' + select;
		eval(reactor)(mode, type, selection);
}
}

function action0(mode, type, selection) {
	switch (status) {
	case 1:
		cm.sendSimple("Very Well. Which item would you like to perform the ritual on? I must warn you? you must have at least one of the items and a #bZakum Diamond#k before we can proceed. \r\n#L2##bI'd like to perform the ritual for the Miner's Hat.#l\r\n#L3#I'd like to perform the ritual for the El Nathian Cape.#l\r\n#L4#I'd like to perform the ritual for the Cloak of Corruption.#l\r\n#L5#I'd like to perform the ritual for the Crystal Blade.#l");
		break;
	case 2:
		cm.dispose();
}
}

function action1(mode, type, selection) {
	switch (status) {
	case 1:
		cm.dispose();
}
}