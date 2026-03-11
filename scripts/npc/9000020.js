/*
	名字:	史匹奈爾
	地圖:	弓箭手村
	描述:	100000000
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
		if (status < 3) {
		cm.dispose();
		return;
		}
		status--;
		break;
	case 1:
		status++;
		break;
		}
		reactor = 'action' + (cm.getPlayer().getMap().getId() == 800000000 ? 1 : 0);
		eval(reactor)(mode, type, selection);
}


function action0(mode, type, selection) {
	switch (status) {
	case 0:
		cm.sendNext("If you're tired of the monotonous daily life, how about getting out for a change? There's nothing quite like soaking up a new culture, learning something new by the minute! It's time for you to get out and travel. We, at the Maple Travel Agency recommend you going on a #bWorld Tour#k! Are you worried about the travel expense? You shouldn't be! We, the #bMaple Travel Agency#k, have carefully come up with a plan to let you travel for ONLY #b3,000 mesos!");
		break;
	case 1:
		cm.sendSimple("We currently offer this place for your traveling pleasure: #bMushroom Shrine of Japan#k. I'll be there serving you as the travel guide. Rest assured, the number of destinations will increase over time. Now, would you like to head over to the Mushroom Shrine? \r\n#L0##bYes, take me to Mushroom Shrine (Japan)#l");
		break;
	case 2:
		cm.sendNext("Would you like to travel to Mushroom Shrine of Japan? If you desire to feel the essence of Japan, there's nothing like visiting the Shrine, a Japanese cultural melting pot. Mushroom Shrine is a mythical place that serves the incomparable Mushroom God from ancient times.");
		break;
	case 3:
		cm.sendNextPrev("Check out the female shaman serving the Mushroom God, and l strongly recommend trying Takoyaki, Yakisoba, and other delicious food sold in the streets of Japan. Now, let's head over to #bMushroom Shrine#k, a mythical place if there ever was one.");
		break;
	case 4:
		if (cm.getPlayer().getMeso() < 3000) {
			cm.sendNext("You don't have enough mesos to take the travel.");
			cm.dispose();
			return;
			}
			cm.dispose();
			cm.gainMeso(-3000);
			cm.getPlayer().saveLocation(Packages.server.maps.SavedLocationType.fromString("WORLDTOUR"));
			cm.getPlayer().changeMap(cm.getMap(800000000), cm.getMap(800000000).getPortal(0));
}
}

function action1(mode, type, selection) {
	switch (status) {
	case 0:
		cm.sendSimple("How's the traveling? Are you enjoying it? \r\n#L0##bYes, I'm done with traveling. Can l go back to #m" + cm.getPlayer().getSavedLocation(Packages.server.maps.SavedLocationType.fromString("WORLDTOUR")) + "#?#l\r\n#L1#No, I'd like to continue exploring this place.#l");
		break;
	case 1:
		if (selection > 0) {
                		cm.sendOk("OK. If you ever change your mind, please let me know.");
			cm.dispose();
			return;
			}
			cm.sendNext("Alright. I'll now take you back to where you were before the visit to Japan. If you ever feel like traveling again down the road, please let me know!");
			break;
	case 2:
		cm.dispose();
		map = cm.getPlayer().getSavedLocation(Packages.server.maps.SavedLocationType.fromString("WORLDTOUR"));
		if (map < 0) map = 100000000

		cm.getPlayer().changeMap(cm.getMap(map), cm.getMap(map).getPortal(0));
		cm.getPlayer().clearSavedLocation(Packages.server.maps.SavedLocationType.fromString("WORLDTOUR"));
}
}