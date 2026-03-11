/*
	名字:	教官爾灣
	地圖:	維多利亞樹木站台
	描述:	104020100
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
		cm.sendSimple("Hop on an airplane to fly far and wide! I'm retired, but I can still give you some flying tips. \r\n#L0##bI want to rent an Airplane.#l\r\n#L1#Explain more about Airplanes.#l\r\n#L2#What kinds of Airplanes are available?#l");
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
		cm.sendSimple("Which airplane would you like to rent? \r\n#L0##b #fSkill/8000.img/skill/80001027/iconMouseOver# Wooen Airplane (1 day) 10,000 mesos#l\r\n#L1# #fSkill/8000.img/skill/80001027/iconMouseOver# Wooen Airplane (7 day) 50,000 mesos#l\r\n#L2##r #fSkill/8000.img/skill/80001028/iconMouseOver# Red Airplane (1 day) 30,000 mesos#l\r\n#L3# #fSkill/8000.img/skill/80001028/iconMouseOver# Red Airplane (7 day) 150,000 mesos#l");
		break;
	case 2:
		if (cm.getPlayer().getMeso() < (selection < 1 ? 10000 : selection < 2 ? 50000 : selection < 3 ? 30000 : 150000)) {
			cm.sendOk("You don't have enough mesos. You need money to fly in style!");
			cm.dispose();
			return;
			}
		if ((selection < 2 && cm.getPlayer().getSkillLevel(80001027) != 1) || (selection > 1 && cm.getPlayer().getSkillLevel(80001028) != 1)) {
			cm.getPlayer().changeSingleSkillLevel(Packages.client.SkillFactory.getSkill(selection < 2 ? 80001027 : 80001028), 1, 1, cm.getCurrentTime() + (((selection == 0 || selection == 2) ? 1 : 7) * 24 * 60 * 60 * 1000));
			cm.gainMeso(-(selection < 1 ? 10000 : selection < 2 ? 50000 : selection < 3 ? 30000 : 150000));
			cm.getClient().getSession().write(Packages.tools.packet.CWvsContext.getTopMsg(selection < 2 ? "Wooen Airplane obtained!" : "Red Airplane obtained!"));
			cm.dispose();
			return;
			}
			cm.sendOk("Didn't I already lend you an airplane?");
			break;
	case 3:
		cm.dispose();
}
}

function action1(mode, type, selection) {
	switch (status) {
	case 1:
		cm.sendNext("You... You don't know what an airplane is? Well, I guess it is a little new. It's, er, a bit like the mounts that you have, but can take you long distances, like to other continents.");
		break;
	case 2:
		cm.sendNextPrev("Course you can't fly to any continent. You can fly to #bVictoria Island, Ereve, Edelstein, Ludibrium, Ariant, Mu Lung, or Leafre#k from #bOrbis#k, using the airplane. You can also fly the opposite route, of course. Lastly, you can fly to #bVictoria Island#k from #bEdelstein#k, and vice-versa. These are the only locations you can take an airplane to... The others are a bit too dangerous yet...");
		break;
	case 3:
		cm.sendNextPrev("If you want to go somewhere using an airplane, talk to the various people running the Intercontinental flights like #bIsa the Station Guide#k at Orbis Station or #bCherry Cabin Crew#k at Station to Orbis.");
		break;
	case 4:
		cm.sendPrev("That's it. Any more questions?");
		break;
	case 5:
		cm.dispose();
}
}

function action2(mode, type, selection) {
	switch (status) {
	case 1:
		cm.sendOk("There are two airplanes that can be rented. The first is the #bWooden Airplane#k. It's inexpensive and reliable. The other is the #bRed Airplane#k. This one is more pricey, but flies faster, and will get you to your destination 10 seconds quicker.");
		break;
	case 2:
		cm.dispose();
}
}