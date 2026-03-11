/*
	名字:	傑克
	地圖:	內部密室的走廊
	描述:	610030100
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
		status--;
		break;
	case 1:
		status++;
		break;
		}
		reactor = 'action' + (cm.getPlayer().getMap().getId() / 100) % 10;
		eval(reactor)(mode, type, selection);
}

function action1(mode, type, selection) {
	switch (status) {
	case 0:
		cm.sendNext("Agh, you have made it in. Let me tell you real quick: they've caught us already. Master Guardians are about to come here in about a minute. We'd better hurry.");
		break;
	case 1:
		cm.sendNextPrev("The portal to the Twisted Masters is busted. We have to find an alternate way, one that will take us through many death traps.");
		break;
	case 2:
		cm.sendNextPrev("You can find the portal somewhere around here... you'd better find it, quick. I'll catch up.");
		break;
	case 3:
		cm.getPlayer().getMap().getReactorByName("mob0").forceHitReactor(1);//給予條件
		cm.dispose();
}
}

function action2(mode, type, selection) {
	switch (status) {
	case 0:
		cm.sendNext("That was a success! Now, for this path, I do believe we need one of every Adventurer class to get past.");
		break;
	case 1:
		cm.sendNextPrev("They need to use their skills on each of these things called Sigils. Once all five have been done, we can get past.");
		break;
	case 2:
		cm.dispose();
}
}

function action3(mode, type, selection) {
	switch (status) {
	case 0:
		cm.sendNext("Now what we have here are more Sigils. All five Adventurers have to climb to the very top and go through the portal.");
		break;
	case 1:
		cm.sendNextPrev("Beware of these death traps: Menhirs. They really pack a punch.");
		break;
	case 2:
		cm.dispose();
}
}

function action4(mode, type, selection) {
	switch (status) {
	case 0:
		cm.sendNext("Now what we have here are more Sigils. However, some of them don't work.");
		break;
	case 1:
		cm.sendNextPrev("These Stirges will get in your way, but they're merely a distraction. Try every one of these Sigils until they work.");
		break;
	case 2:
		cm.dispose();
}
}

function action5(mode, type, selection) {
	switch (status) {
	case 0:
		cm.sendNext("Surprised you made it this far! What you see here is the statue of Crimsonwood Keep, but without any of it's weapons.");
		break;
	case 1:
		cm.sendNextPrev("There are five rooms, marked by a statue near each of them, around the statue.");
		break;
	case 2:
		cm.sendNextPrev("I suspect that each of these rooms have one of the statue's five weapons.");
		break;
	case 3:
		cm.sendNextPrev("Bring back the weapons and restore them to the Relic of Mastery!");
		break;
	case 4:
		cm.dispose();
}
}

function action7(mode, type, selection) {
	switch (status) {
	case 0:
		cm.sendNext("That was some good work out there! This leads the way to the Twisted Masters' Armory.");
		break;
	case 1:
		cm.dispose();
}
}