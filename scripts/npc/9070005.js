/*
	名字:	羅茲弟
	地圖:	戰鬥廣場
	描述:	960000000
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
		cm.sendSimple("New to Battle Mode? Ask me anything, and I'll share my vast wisdom! \r\n#L0#What can I do here?#l\r\n#L1#I want to try Battle Mode... Tell me how!#l\r\n#L2#What's an lce Knight?#l\r\n#L3#What's in it for me?#l");
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
		cm.sendNext("It's the age-old question: Who's the strongest? Who's the toughest?! Who's got what it takes!?! Find out by #rbattling other Maplers#k in Battle Square! If you're the competitive type--and I hope you are--and want to take a break from hunting, give Battle Mode a shot!");
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

function action2(mode, type, selection) {
	switch (status) {
	case 1:
		cm.sendSimple("In #bIce Knight#k mode, you fight with a group of fellow Maplers to defeat the fearsome Ice Knight...or transform into the Knight himself! \r\n#L0#Tell me more about Ice Knight battles.#l\r\n#L1#What can I do as an Ice Knight?#l");
		break;
	case 2:
		cm.dispose();
}
}

function action3(mode, type, selection) {
	switch (status) {
	case 1:
		cm.sendNext("#h0#, your Battle Mode matches will earn you #r#eEXP#n#k and Battle Points, or #r#eBP#n#k. The EXP you earn will help you level up and #r#eBP#n#k can be used at the #b#eBPExchanger#n#k to trade for #v4310015# #r#t4310015#s#k.");
		break;
	case 2:
		cm.sendNextPrev("Over by the stadium wall at the right, #bLarson#k exchanges #v4310015# #r#t4310015#s#k for cool rewards like #v1132086# #r#t1132086##k, #v1152050# #r#t1152050##k, #v1112596# #r#t1112596##k, and #v1122105# #r#t1122105##k. Check it out!");
		break;
	case 3:
		cm.dispose();
}
}