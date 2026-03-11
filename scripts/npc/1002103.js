/*
	名字:	領袖阿爾
	地圖:	維多利亞港
	描述:	104000000
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
		cm.sendSimple("Hello there! I'm Al, who's been serving as the leader of a Family for 30 years. Aren't you curious to find out what a Family is? \r\n#L0##bWhat's a Family?#l\r\n#L1#What's a Rep?#l\r\n#L2#What's Rep for?#l\r\n#L3#I'd like a Medal.#l");
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
		cm.sendNext("Family is what it is, a group of people that are like a family. The leader is the one person that leads that Family. Of course, the person in charge of the Family is the one responsible for taking care of his or her Family members.");
		break;
	case 2:
		cm.sendNextPrev("Hmmm? What happens if the Senior doesn't take care of the Family members? Hah... well... you'll find out rather harshly if you decide to do that. Your Family members will soon look for a leader who is more qualified to take care of them, and jump ship.");
		break;
	case 3:
		cm.dispose();
}
}

function action1(mode, type, selection) {
	switch (status) {
	case 1:
		cm.sendNext("Rep is a good barometer for how well the Senior takes care of the Juniors. The Senior's primary role is the foster a nurturing environment for his or her Junior to grow well, whether it be by providing weapons, mesos, or others.");
		break;
	case 2:
		cm.sendNextPrev("The important thing here is that #byour Rep will only go up if you've provided support for your Juniors.");
		break;
	case 3:
		cm.dispose();
}
}

function action2(mode, type, selection) {
	switch (status) {
	case 1:
		cm.sendNext("The acclaimed explorers all have their own set of knowledge and know-how on explorations, a set of knowledge that can only be obtained by leading their Juniors to prosperity. You tend to learn a lot more when you are on the background, teaching others, as opposed to experiencing everything first-hand. They than use their acquired techniques to enjoy benefits that others can't even dream of. Those are called #bExplorers#k.");
		break;
	case 2:
		cm.sendNextPrev("The higher the Rep, the more it means you are enjoying that many benefits. Use them wisely, and you'll find yourself ahead of the pack from others. Just remember that using those Reps too often will plant a seed of doubt on others looking at the Rep level. Why? Oh that's only because your Rep will decrease everytime you use one..");
		break;
	case 3:
		cm.dispose();
}
}

function action3(mode, type, selection) {
	switch (status) {
	case 1:
		cm.sendNext("Let's see... so there are "+ cm.getTotalJuniors() + " in your Family. The medal serves as the owner of the title, and you want that? Hahahaha... I will give you the title once your Family reaches #r1,000#k Juniors under you, although even my Family adds up to around 300, so that won't happen any time soon...");
		break;
	case 2:
		cm.dispose();
}
}