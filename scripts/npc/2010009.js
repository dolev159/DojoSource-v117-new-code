/*
	名字:	雷娜裡歐
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
		if (type == 2) {
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
		cm.sendSimple("Hello there! I'm #bLenario#k. \r\n#L0##bCan you please tell me what a Guild Union is all about?#l\r\n#L1#How do I make a Guild Union?#l\r\n#L2#I want to make a Guild Union.#l\r\n#L3#I want to add more guilds to the Guild Union.#l\r\n#L4#I want to disband the Guild Union.#l");
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
		cm.sendNext("Guild Union is just as its name suggests, which is a union of several guilds, joined together to form a super group. I am in charge of managing these Guild Unions.");
		break;
	case 2:
		cm.dispose();
}
}

function action1(mode, type, selection) {
	switch (status) {
	case 1:
		cm.sendNext("To create a guild union, the 2 guild leaders must make a party. The leader of this party will become the guild union leader.");
		break;
	case 2:
		cm.sendNextPrev("Once you have 2 guild leaders together, you'll need 5 million mesos to register the guild union.");
		break;
	case 3:
		cm.sendNextPrev("One more thing! It should be obvious, but you cannot create a new Guild Union if you already belong as a member to another one!");
		break;
	case 4:
		cm.dispose();
}
}

function action2(mode, type, selection) {
	switch (status) {
	case 1:
		if (cm.getPlayer().getGuild().getAllianceId() > 0) { //申請者是否已加入聯盟
			cm.sendNext("You cannot form a Guild Union if you are already affiliated with a different Union.");
			cm.dispose();
			return;
			}
		if (cm.getPlayer().getGuildId() < 1 || cm.getPlayer().getGuildRank() != 1) { //是否加入公會，並且是公會會長
			cm.sendNext("Only the guild leader can form a guild union.");
			cm.dispose();
			return;
			}
		if (cm.getPlayer().getParty() == null || cm.getPlayer().getParty().getLeader().getId() != cm.getPlayer().getId()) { //是否組隊，並且是小組組長
			cm.sendNext("Only the party leader can form a Guild Union.");
			cm.dispose();
			return;
			}
		if (cm.getPlayer().getParty().getMembers().size() != 2) { //小組人數
			cm.sendNext("You can create a Guild Union if your party consists of two people.");
			cm.dispose();
			return;
			}
		if (cm.getPartyMembers().get(1).getGuildId() < 1 || cm.getPartyMembers().get(1).getGuildRank() != 1) { //組員是否加入公會，並且是公會會長
			cm.sendNext("Your party member does not seem to own a guild.");
			cm.dispose();
			return;
			}
		if (cm.getGuild(cm.getPartyMembers().get(1).getGuildId()).getAllianceId() > 0) { //組員是否已加入其它聯盟
			cm.sendNext("Your party member is already affiliated with a guild union.");
			cm.dispose();
			return;
			}
		if (cm.getPlayer().getParty().getMembers().get(1).getMapid() != 200000301) { //組員所在地圖
			cm.sendNext("Get your other party member on the same map please.");
			cm.dispose();
			return;
			}
			cm.sendYesNo("Oh my, would you like to create a Guild Union? You will need 5,000,000 mesos in order to register a Guild Union.");
			break;
	case 2:
		cm.sendGetText("Now, please enter the name of your new Guild Union. (max. 12 letters)");
		break;
	case 3:
		guildName = cm.getText();
		cm.sendYesNo("Will #b"+ guildName + "#k be the name of your Guild Union?");
		break;
	case 4:
		if (cm.createAlliance(guildName)) {
			cm.sendNext("You have successfully formed a Guild Union.");
			cm.dispose();
			return;
			}
			cm.sendNext("This name is unavailable, please choose another one.");
			cm.dispose();
}
}

function action3(mode, type, selection) {
	switch (status) {
	case 1:
		if (cm.getPlayer().getGuildRank() != 1 || cm.getPlayer().getMGC().getAllianceRank() != 1) {
			cm.sendNext("Only the Guild Union Master can expand the number of guilds in the Union.");
			cm.dispose();
			return;
			}
			cm.sendYesNo("To increase the capacity, you will need to pay 10,000,000 mesos. Are you sure you wish to proceed?");
			break;
	case 2:
		if (cm.addCapacityToAlliance()) {
			cm.sendOk("You have added capacity to your alliance.");
			cm.dispose();
			return;
			}
			cm.sendOk("Your guild union has too much capacity already. 5 is the maximum.");
			cm.dispose();
}
}

function action4(mode, type, selection) {
	switch (status) {
	case 1:
		if (cm.getPlayer().getGuildRank() != 1 || cm.getPlayer().getMGC().getAllianceRank() != 1) {
			cm.sendNext("Only the Guild Union Master may disband the Guild Union.");
			cm.dispose();
			return;
			}
			cm.sendYesNo("Are you sure you want to disband your Guild Union?");
			break;
	case 2:
		cm.disbandAlliance();
		cm.sendOk("Your Guild Union has been disbanded.");
		cm.dispose();
}
}