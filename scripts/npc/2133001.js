/*
	名字:	艾靈
	地圖:	毒霧森林
	描述:	930000000
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
		if (cm.getPlayer().getMap().getId() == 930000300) {
		cm.sendNext("What on earth do you have to do here? You thinking of setting up camp?");
		cm.dispose();
		return;
		}
		if (type == 2) {
		cm.sendNext("Come on! Don't give up!");
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
		reactor = 'action' + cm.getPlayer().getMap().getId();
		eval(reactor)(mode, type, selection);
}

function action930000000(mode, type, selection) {
	switch (status) {
	case 0:
		cm.sendSimple("I'll transform you into one of the soldiers from Altaire Camp before you enter the forest in search of the mysterious man. You'll already be transformed when you enter the Mouth of the Forest via the portal, so be prepared. \r\n#L0##bWho will I be transformed into?#l\r\n#L1#Why must I transform?#l\r\n#L10#Exit the Forest of Poison Haze.#l");
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
		cm.sendNext("The transformation magic will turn you into someone best matched to you. It'll probably be based on your class, so Warriors will become Kanderune, Magicians will become would be Perzen, Bowmen will become Athena Pierce, Thieves will become Lohd, and Pirates will become Yuris.");
		break;
	case 2:
		cm.dispose();
}
}

function action1(mode, type, selection) {
	switch (status) {
	case 1:
		cm.sendNext("Obviously it's because you're #bfrom another dimension#k. You reek of it! They'd catch you in a heartbeat! We're not supposed to mess with history, so I'm transforming you into one of the knights.");
		break;
	case 2:
		cm.sendNextPrev("Whatever you do will remembered as someone else's work, but Ellin will remember you. Fairies have a very long lifespan, so we'll remember you for a long, long time.");
		break;
	case 3:
		cm.dispose();
}
}

function action10(mode, type, selection) {
	switch (status) {
	case 1:
		cm.sendYesNo("Are you sure you want to exit the forest?");
		break;
	case 2:
		cm.getPlayer().changeMap(cm.getMap(930000800), cm.getMap(930000800).getPortal(0));
		cm.dispose();
}
}

function action930000010(mode, type, selection) {
	switch (status) {
	case 0:
		cm.sendNext("Your transformation is complete! Take a look at yourself and check out who you've become! Once you're done looking at yourself, enter the portal to enter the Forest of Poison Haze.");
		break;
	case 1:
		cm.dispose();
}
}

function action930000100(mode, type, selection) {
	switch (status) {
	case 0:
		cm.sendSimple("There are poisoned monsters at the Mouth of the Forest. Eliminate them! \r\n#L0##bI want to exit this place.#l");
		break;
	case 1:
		cm.sendYesNo("Are you sure you want to exit the forest?");
		break;
	case 2:
		cm.getPlayer().changeMap(cm.getMap(930000800), cm.getMap(930000800).getPortal(0));
		cm.dispose();
}
}

function action930000200(mode, type, selection) {
	switch (status) {
	case 0:
		cm.sendNext("A thorny bush is blocking the path out of this place. We must get rid of it, but it can only be removed using the #rpoison from Stone Bugs#k. However, if the poison is too strong, no one can get past the poisoned ground.");
		break;
	case 1:
		cm.sendSimple("Here's what we need to do: \r\n#b1. Defeat a Stone Bug and drop its poison into a puddle. \r\n2. Take the diluted poison to the thorny bush. \r\n3. Pour diluted poison onto the bush until it withers away.#k \r\nSounds easy, right? \r\n#L0##bI just want to leave this place.#l");
		break;
	case 2:
		cm.sendYesNo("Are you sure you want to exit the forest?");
		break;
	case 3:
		cm.getPlayer().changeMap(cm.getMap(930000800), cm.getMap(930000800).getPortal(0));
		cm.dispose();
}
}

function action930000300(mode, type, selection) {
	switch (status) {
	case 0:
		cm.sendYesNo("You made it! l started to panic when I couldn't see you in the fog. Do you want to go deeper into the forest? lf so, I'lI send your party members with you.");
		break;
	case 1:
		eim = cm.getPlayer().getEventInstance();
		for (var i = 0; i < eim.getPlayers().size(); i++)
		eim.getPlayers().get(i).changeMap(eim.getMapInstance(930000400), eim.getMapInstance(930000400).getPortal(0));
		cm.dispose();
}
}

function action930000400(mode, type, selection) {
	eim = cm.getPlayer().getEventInstance();
	reactor = 'action' + (eim.getProperty("drop") == null ? 2 : 3);
	eval(reactor)(mode, type, selection);
}

function action2(mode, type, selection) {
	switch (status) {
	case 0:
		cm.sendSimple("Something's turned the good denizens of the forest into those awful Sprights! It's so sad, they were so nice before! Please go eliminate the Sprights and bring back their Monster Marbles! I might be able to cure them if you do. \r\n#L0##bI want out of this place.#l");
		break;
	case 1:
		cm.sendYesNo("Are you sure you want to exit the forest?");
		break;
	case 2:
		cm.getPlayer().changeMap(cm.getMap(930000800), cm.getMap(930000800).getPortal(0));
		cm.dispose();
}
}

function action3(mode, type, selection) {
	switch (status) {
	case 0:
		if (cm.getPlayer().getParty().getLeader().getId() != cm.getPlayer().getId()) {
			cm.sendNext("I'll need to talk to your party leader if you want to proceed.");
			cm.dispose();
			return;
			}
		if (eim.getProperty("stage4") == null) {
			cm.sendOk("You brought the Monster Marbles! I'll try to purify one of these Sprights. Maybe he can tell us what to do next!");
			cm.getPlayer().getMap().spawnNpc(2133004, new java.awt.Point(-287, -244));
			eim.setProperty("stage4", 1);
			cm.dispose();
			return;
			}
			cm.sendNext("He's awake! Look how cute he is now! You should ask him how to help the forest!");
			break;
	case 1:
		cm.dispose();
}
}

function action930000600(mode, type, selection) {
	switch (status) {
	case 0:
		if (cm.getPlayer().getMap().getMonsterById(9300183) != null) {
			cm.sendOk("You've gotten rid of the Golems. Now #bexit through the portal on the right#k and talk to me again.");
			cm.dispose();
			return;
			}
			cm.sendSimple("This is the #rForest of Poison#k, where the mysterious man should be... But he's not here. Maybe you should place the Magic Stone near the altar like the Spright suggested. Go ahead. \r\n#L10##bI want to get out of here.#l\r\n#L4#I don't have the Magic Stone.#l");
			break;
	default:
		if (status == 1 && type == 5) select = selection;
		reactor = 'action' + select;
		eval(reactor)(mode, type, selection);
}
}

function action4(mode, type, selection) {
	switch (status) {
	case 1:
		if (cm.getPlayer().itemQuantity(4001163)) {
			cm.sendOk("I think you already have the Magic Stone. Hurry and take it to the altar!");
			cm.dispose();
			return;
			}
		if (cm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.ETC).getNumFreeSlot() < 1) {
			cm.sendOk("You don't have enough slots for me to give you Magic Stone.");
			cm.dispose();
			return;
			}
			cm.gainItem(4001163, 1);
			cm.sendNext("Here's the Magic Stone. Hurry and take it to the altar!");
			break;
	case 2:
		cm.dispose();
}
}

function action930000700(mode, type, selection) {
	switch (status) {
	case 0:
		cm.sendNext("Thank you for your help! Although we didn't discover the Mystery Man's identity, we did disturb his precious research. I'm sure he'll appear sooner or later. This wasn't a total waste, so let's be satisfied with what we did.");
		break;
	case 1:
		if (cm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.ETC).getNumFreeSlot() > 0) {
			cm.getPlayer().changeMap(cm.getMap(930000800), cm.getMap(930000800).getPortal(0));
			cm.gainItem(4001198, 1);
			cm.dispose();
			return;
			}
			cm.sendNextPrev("You don't have enough slots for me to give you Altaire Fragment. Talk to me again when you have one available.");
			break;
	case 2:
		cm.dispose();
}
}