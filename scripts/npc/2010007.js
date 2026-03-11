/*
	名字:	海拉格
	地圖:	公會本部&amp;lt;英雄之殿&gt;
	描述:	200000301
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
		if (type == 2 && select < 4) {
		cm.sendNext("You're not ready yet? Come back to me when you want to create a guild.");
		cm.dispose();
		return;
		}
		if (type == 2 && select < 6) {
		cm.sendNext("Are the fees too expensive? Collecting GP is pretty easy, you know. Anyway, I hope to see you again soon.");
		cm.dispose();
		return;
		}
		if (type == 2 && select < 7) {
		cm.sendNext("Good choice. You can't just give up on a guild that you built yourself...");
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
		cm.sendNext("Hey...would you happen to be interested in GUILDS by any chance?");
		break;
	default:
		reactor = 'action' + (cm.getPlayer().getGuildRank() == 1 ? 4 : 0);
		eval(reactor)(mode, type, selection);
}
}

function action0(mode, type, selection) {
	switch (status) {
	case 1:
		cm.sendSimple("What do you want? Tell me... \r\n#L1##bWhat is a guild?#l\r\n#L2#How do I create a guild?#l\r\n#L3#I want to create a guild.#l");
		break;
	default:
		if (status == 2 && type == 5) select = selection;
		reactor = 'action' + select;
		eval(reactor)(mode, type, selection);
}
}

function action1(mode, type, selection) {
	switch (status) {
	case 2:
		cm.sendNext("You can think of a guild as a small crew full of people with similar interests and goals, except it will be officially registered in our Guild Base and be accepted as a valid GUILD.");
		break;
	case 3:
		cm.sendNextPrev("There are a variety of benefits that you can get through guild activities. For example, you can obtain a guild skill or an item that is exclusive to guilds.");
		break;
	case 4:
		cm.dispose();
}
}

function action2(mode, type, selection) {
	switch (status) {
	case 2:
		cm.sendNext("You must be at least Lv. 101 to create a guild.");
		break;
	case 3:
		cm.sendNextPrev("You also need 5,000,000 mesos. This is the registration fee.");
		break;
	case 4:
		cm.sendNextPrev("So, come see me if you would like to register a guild! Oh, and of course you can't be already registered to another guild!");
		break;
	case 5:
		cm.dispose();
}
}

function action3(mode, type, selection) {
	switch (status) {
	case 2:
		cm.sendYesNo("Oh! So you're here to register a guild... You need 5,000,000 mesos to register a guild. I trust that you are ready. Would you like to create a guild?");
		break;
	case 3:
		if (cm.getPlayer().getGuildId() > 0) {
			cm.sendOk("You may not create a new Guild while you are in one.");
			cm.dispose();
			return;
			}
		if (cm.getPlayer().getLevel() < 101) {
			cm.sendOk("Hey, your level is a bit low to be a guild leader. You need to be at least level 101 to create a guild.");
			cm.dispose();
			return;
			}
		if (cm.getPlayer().getMeso() < 5000000) {
			cm.sendNext("Please check again. You'll need to pay the service fee to create and register a guild.");
			cm.dispose();
			return;
			}
			cm.sendNext("Enter the name of your guild, and your guild will be created. The guild will also be officially registered under our Guild Base, so best of luck to you and your guild!");
			break;
	case 4:
		cm.genericGuildMessage(1);
		cm.dispose();
}
}

function action4(mode, type, selection) {
	switch (status) {
	case 1:
		cm.sendSimple("What do you want? Tell me... \r\n#L5##bI want to expand the guild.#l\r\n#L6#I want to disband the guild.#l\r\n#L7#I want to change the guild leader.#l");
		break;
	default:
		if (status == 2 && type == 5) select = selection;
		reactor = 'action' + select;
		eval(reactor)(mode, type, selection);
}
}

function action5(mode, type, selection) {
	switch (status) {
	case 2:
		cm.sendNext("Are you here because you want to expand your guild? To increase the number of people you can accept into your guild, you'll have to re-register. You'll also have to pay a fee. Just so you know, the absolute maximum size of a guild is 200 members.");
		break;
	case 3:
		cm.sendYesNo("Current Max Guild Members: 20 characters. To increase that amount by #b10#k, you need #b10000 GP#k. Your guild has #b150 GP#k right now. Do you want to expand your guild?");
		break;
	case 4:
		cm.increaseGuildCapacity(true); //true為 25,000 GP添加人數
		break;
	case 5:
		cm.dispose();
}
}

function action6(mode, type, selection) {
	switch (status) {
	case 2:
		cm.sendYesNo("Are you sure you want to break up your guild? Remember, once you break up your guild, it will be gone forever. Are you sure you still want to do it?");
		break;
	case 3:
		cm.sendYesNo("I'll ask one more time. Would you like to give up all guild privileges and disband the guild?");
		break;
	case 4:
		cm.disbandGuild();
		cm.dispose();
}
}

function action7(mode, type, selection) {
	switch (status) {
	case 2:
		cm.sendNext("Is leading a guild becoming a burden on you? Select a new leader from the member list to appoint by right-clicking and pressing the Make GM button. However, the member you select must be online.");
		break;
	case 3:
		cm.dispose();
}
}