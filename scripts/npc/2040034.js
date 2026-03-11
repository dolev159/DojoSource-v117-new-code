/*
	名字:	標示牌
	地圖:	愛奧斯塔101樓
	描述:	221023300
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
		cm.sendSimple("#e<Party Quest: Dimensional Crack>#n \r\nYou can't go any higher because of the extremely dangerous creatures above. Would you like to collaborate with party members to complete the quest? If so, please have your #bparty leader#k talk to me. \r\n#L0##bI want to participate in the party quest.#l\r\n#L1#I want to find party members.#l\r\n#L2#I want to receive the Broken Glasses.#l\r\n#L3#I would like to hear more details.#l");
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
		if (cm.getPlayer().getParty() == null || cm.getPlayer().getParty().getLeader().getId() != cm.getPlayer().getId()) {
			cm.sendOk("From here on above, this place is full of dangerous objects and monsters, so I can't let you make your way up anymore. If you're interested in saving us and bring peace back into Ludibrium, however, that's a different story. If you want to defeat a powerful creature residing at the very top, then please gather up your party members. It won't be easy, but ... I think you can do it.");
			cm.dispose();
			return;
			}
			party = cm.getPlayer().getParty().getMembers();
			for (var i = 0; i < party.size(); i++)
		if (party.size() < 3) {
			cm.sendNext("You cannot participate in the quest because you do not have at least 3 party members.");
			cm.dispose();
			return;
			}
			for (var i = 0; i < party.size(); i++)
		if (party.get(i).getMapid() != 221023300) {
			cm.sendNext("Some of your party members are in a different map. Make sure they're all here!");
			cm.dispose();
			return;
			}
			for (var i = 0; i < party.size(); i++)
		if (party.get(i).getLevel() < 30) {
			cm.sendNext("Either you or one of your party members is below Lv. 30. Please fit the level requirement before proceeding.");
			cm.dispose();
			return;
			}
			var em = cm.getEventManager("LudiPQ");
			var prop = em.getProperty("state");
		if (prop == null || prop == 0) {
			em.startInstance(cm.getPlayer().getParty(), cm.getPlayer().getMap(), 200);
			cm.dispose();
			return;
			}
			cm.sendNext("Another party is already fighting on the other side. Wait a moment and try again.");
			cm.dispose();
}
}

function action1(mode, type, selection) {
	switch (status) {
	case 1:
		cm.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.sendUIWindow(7, 1));
		cm.dispose();
}
}

function action2(mode, type, selection) {
	switch (status) {
	case 1:
		if (cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(1202)).getCustomData() < 35) {
			cm.sendNext("I am offering 1 #v1022073##b#t1022073##k for every 35 times you help me. If you help me #b" + (35 - parseInt(cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(1202)).getCustomData())) + " more times, you can receive Broken Glasses.");
			cm.dispose();
			return;
			}
			cm.sendAcceptDecline("Thank you for your help. You have helped " + cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(1202)).getCustomData() + " times in total and have received 0 of #bBroken Glasses(s)#k, so you still have 1 remaining. Would you like to receive #bBroken Glasses#k?");
			break;
	case 2:
		if (cm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.EQUIP).getNumFreeSlot() < 1) {
			cm.getClient().getSession().write(Packages.tools.packet.CWvsContext.serverNotice(1, "Equip item inventory is full."));
			cm.dispose();
			return;
			}
			cm.gainItem(1022073, 1);
			cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(1202)).setCustomData(parseInt(cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(1202)).getCustomData()) - 35);
			cm.dispose();
}
}

function action3(mode, type, selection) {
	switch (status) {
	case 1:
		cm.sendOk("#e<Party Quest: Dimensional Crack>#n \r\nA Dimensional Crack has appeared in #bLudibrium#k! We desperately need brave adventurers who can defeat the intruding monsters. Please, party with some dependable allies to save Ludibrium! You must pass through various stages by defeating monsters and solving quizzes, and ultimately defeat #rAlishar#k. \r\n#e- Level#n: 30 or higher #r(Recommended Level: 20 - 69 )#k  \r\n#e- Time Limit#n: 20 min. \r\n#e- Number of Participants#n: 3 to 6 \r\n#e- Reward#n: #v1022073# #t1022073# #b(obtained every 35 time(s) you participate)#k \r\n                         Various Use, Etc, and Equip items");
		break;
	case 2:
		cm.dispose();
}
}