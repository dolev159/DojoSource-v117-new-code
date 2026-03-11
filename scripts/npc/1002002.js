/*
	名字:	佩森
	地圖:	白色波浪碼頭
	描述:	120020400
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
		if (type == 2) {
		cm.sendNext("You must have some business to take care of here. You must be tired from all that traveling and hunting. Go take some rest, and if you feel like changing your mind, then come talk to me.");
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
		cm.sendSimple("You can take the boat, if you like. Where would you like to go? \r\n#L0#Florina Beach, please.#l");
		break;
	case 1:
		cm.sendSimple("Have you heard about #b#m120030000##k not too far from #m120020400#? You can go there if you have #b2000 Mesos#k or a #bVIP Ticket to Florina Beach#k. \r\n#L0##bI'll pay 2000 Mesos.#l\r\n#L1#I have a VIP Ticket to Florina Beach.#l\r\n#L2#What is a VIP Ticket to Florina Beach?#l");
		break;
	default:
		if (status == 2 && type == 5) select = selection;
		reactor = 'action' + select;
		eval(reactor)(mode, type, selection);
}
}

function action0(mode, type, selection) {
	switch (status) {
	case 2:
		cm.sendYesNo("You want to pay #b2000 Mesos#k to go to #m120030000#? Sure, but don't forget that there are monsters there, too. I'll prepare to set sail. Okay. You ready to head for #m120030000# right now?");
		break;
	case 3:
		if (cm.getPlayer().getMeso() < 2000) {
			cm.sendNext("I think you're lacking mesos. There are many ways to gather up some money, you know, like... selling your armor... defeating monsters... doing quests... you know what I'm talking about.");
			cm.dispose();
			return;
			}
			cm.getPlayer().changeMap(cm.getMap(120030000), cm.getMap(120030000).getPortal(0));
			cm.gainMeso(-2000);
			cm.dispose();
}
}

function action1(mode, type, selection) {
	switch (status) {
	case 2:
		cm.sendYesNo("So you have a #bVIP Ticket to Florina Beach#k? You can always head over to Florina Beach with that. Alright then, but just be aware that you may be running into some monsters there too. Okay, would you like to head over to Florina Beach right now?");
		break;
	case 3:
		if (cm.getPlayer().itemQuantity(4031134) < 1) {
			cm.sendNext("Hmmm, so where exactly is your #bVIP Ticket to Florina Beach#k? Are you sure you have one? Please double-check.");
			cm.dispose();
			return;
			}
			cm.getPlayer().changeMap(cm.getMap(120030000), cm.getMap(120030000).getPortal(0));
			cm.dispose();
}
}

function action2(mode, type, selection) {
	switch (status) {
	case 2:
		cm.sendNext("You must be curious about a #bVIP Ticket to Florina Beach#k. Haha, that's very understandable. A VIP Ticket to Florina Beach is an item where as long as you have in possession, you may make your way to Florina Beach for free. It's such a rare item that even we had to buy those, but unfortunately I lost mine a few weeks ago during my precious summer break.");
		break;
	case 3:
		cm.sendNextPrev("I came back without it, and it just feels awful not having it. Hopefully someone picked it up and put it somewhere safe. Anyway, this is my story and who knows, you may be able to pick it up and put it to good use. If you have any questions, feel free to ask.");
		break;
	case 4:
		cm.dispose();
}
}