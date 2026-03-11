/*
	名字:	坎特
	地圖:	危海中心
	描述:	923040300
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
		if (type == 2) {
		cm.sendNext("Thank you. Please help me eliminate Pianus and finish this research.");
		cm.dispose();
		return;
		}
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
		reactor = 'action' + (cm.getPlayer().getMap().getId() == 923040300 ? 0 : cm.getPlayer().getMap().getAllMonstersThreadsafe().size() > 0 ? 3 : 4);
		eval(reactor)(mode, type, selection);
}

function action0(mode, type, selection) {
	switch (status) {
	case 0:
		cm.sendSimple("Thank you very much for your help. I saw something inside the cave, but there's no way I'm going back down there. Could you help me? \r\n#L1##bSure, I'll help you with your Dangerous Cave Research.#l\r\n#L2#I just remembered, I have something else to do...far away from here.#l");
		break;
	default:
		if (status == 1 && type == 5) select = selection;
		reactor = 'action' + select;
		eval(reactor)(mode, type, selection);
}
}

function action1(mode, type, selection) {
	switch (status) {
	case 1:
		cm.sendNext("When I was here last time, I heard some strange sounds from the cave. I couldn't help but check it out, and I found some kind of huge fish! I think. Could you go with me to the cave and see if it's still there?");
		break;
	case 2:
		cm.dispose();
		cm.getPlayer().changeMap(cm.getMap(923040400), cm.getMap(923040400).getPortal(0));
}
}

function action2(mode, type, selection) {
	switch (status) {
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

function action3(mode, type, selection) {
	switch (status) {
	case 0:
		cm.sendSimple("Those sea creatures are getting even angrier! I've never seen them like this... Wait, you're not leaving, are you? \r\n#L0##bYeah, I need to get out of here!#l");
		break;
	case 1:
		cm.sendYesNo("You want to leave already? What about me? There's lots of research and not getting eaten to do!");
		break;
	case 2:
		cm.sendNext("So, I'm supposed to fight Pianus myself? Do I look like I can handle Pianus?");
		break;
	case 3:
		cm.getPlayer().changeMap(cm.getMap(923040000), cm.getMap(923040000).getPortal(0));
		cm.dispose();
}
}

function action4(mode, type, selection) {
	switch (status) {
	case 0:
		cm.sendSimple("Thank you very much for your help. I was able to finish researching the cave life because of you. If you find any #bPianus Scales#k, bring them to #rDolphin at the Forked Road: Dangerous Sea <Lobby>#k. Those items will help my research a lot. If you bring 100 or more of them, l will give you #v1022123# #t1022123# as a gift. Oh, the dolphin must be worried... I should get back home. \r\n#L0#Take care.#l");
		break;
	case 1:
		cm.sendNext("Thanks again for all your help. I hope you'll be there if I ever get in trouble again! See you.");
		break;
	case 2:
		cm.getPlayer().changeMap(cm.getMap(923040000), cm.getMap(923040000).getPortal(0));
		cm.dispose();
}
}