/*
	名字:	休菲凱曼
	地圖:	怪物公園
	描述:	951000000
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
		cm.sendSimple("Welcome to the Monster Park! My name is Spiegelmann, and I am the owner, and operator of the Monster Park. That funny face you're making tells me you have some questions. What would you like to know? \r\n#L0##bWhat is the Monster Park?#l\r\n#L1#I heard I can get a special item at the Monster Park...#l\r\n#L2#I would like to exchange Monster Park Commemorative Coins for an item.#l");
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
		cm.sendNext("What is the #bMonster Park#k? It's a park full of monsters! Ha! But don't worry, it's more fun than it sounds. You see, I've brought monsters here from all over the world, and set them up as special challenges for hardy adventurers.");
		break;
	case 2:
		cm.sendNextPrev("As you must know, I only want to see peace and harmony flourish in Maple World. For that reason, I made all the dungeons in the monster Park #bParty Zones#k, to encourage people to work and have fun together.");
		break;
	case 3:
		cm.sendNextPrevS("Is there another reason that you opened the Monster Park?", 2);
		break;
	case 4:
		cm.sendNextPrev("Another reason? Why, don't be ridiculous! I just want everyone to enjoy my Monster Park. Of course, I can't just let everyone in. No, see, you need a ticket to enter the park.");
		break;
	case 5:
		cm.sendNextPrev("But don't worry, they're easy to get. When you are hunting regular monsters, you will sometimes find #bZebra Stripe Ticket Pieces, Leopard Stripe Ticket Pieces#k, or #bTiger Stripe Ticket Pieces#k. Once you collect 10 of any of them, go see #b#p9071002##k. She will exchange them for an entrance ticket.");
		break;
	case 6:
		cm.dispose();
}
}

function action1(mode, type, selection) {
	switch (status) {
	case 1:
		cm.sendNext("Ha! Word travels fast, I guess. Yes, we do have special items here. Why don't you take a look? \r\n#b#v1012270:# #t1012270# (5 days) \r\n#v1162008:# #t1162008# (7 days) \r\n#v2430275:# #t2430275# \r\n#v2550000:# #t2550000##k \r\n\r\nSee something that interests you? Well, I left some special souvenirs in the Monster Park. When you find #bMonster Park Commemorative Coins#k while hunting monsters in the Monster Park, bring them to #bLaku#k to exchange them for these special gifts.");
		break;
	case 2:
		cm.sendNextPrev("All right, have fun at the Monster Park!");
		break;
	case 3:
		cm.dispose();
}
}

function action2(mode, type, selection) {
	switch (status) {
	case 1:
		cm.sendOk("I'm very busy running the Monster Park, so I cannot exchange your souvenirs for gifts. \r\nHowever, my assistant #bLaku#k can help you with that. Remember, take your items to Laku for special gifts! Have fun, now!");
		break;
	case 2:
		cm.dispose();
}
}