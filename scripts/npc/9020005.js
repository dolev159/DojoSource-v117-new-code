/*
	名字:	簡
	地圖:	隐藏的塔入口&amp;lt;准备地图&gt;
	描述:	921160000
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
		cm.sendSimple("#e<Party Quest: Escape>#n \r\nThe truth is, I wanted to run away...but I couldn't leave him behind. He's trapped in the Aerial Prison, and needs someone to bust him out. \r\n#L0##bI'll help the Explorer trapped in the castle!#l\r\n#L1#Please tell me about the castle's prison.#l\r\n#L2#Please tell me more about the Prison Guard Key.#l");
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
			cm.sendOk("It's a terrible place, filled with dangerous enemies. You're going to need a serious party for this. When you get one together, have your party leader talk to me.");
			cm.dispose();
			return;
			}
			party = cm.getPlayer().getParty().getMembers();
			for (var i = 0; i < party.size(); i++)
		if (party.size() < 3 || party.get(i).getLevel() < 120) {
			cm.sendNext("You have less than 3 party members. You can only enter if you have 3 or more party members who are Lv. 120 or higher.");
			cm.dispose();
			return;
			}
			for (var i = 0; i < party.size(); i++)
		if (party.get(i).getMapid() != 921160000) {
			cm.sendOk("One of your party members is in a different map. Get them here so you can all go together.");
			cm.dispose();
			return;
			}
			var em = cm.getEventManager("Prison");
			var prop = em.getProperty("state");
		if (prop == null || prop == 0) {
			em.startInstance(cm.getPlayer().getParty(), cm.getPlayer().getMap(), 200);
			cm.dispose();
			return;
			}
			cm.sendNext("Some other party has already gotten in to try clearing the quest. Please try again later.");
			cm.dispose();
}
}

function action1(mode, type, selection) {
	switch (status) {
	case 1:
		cm.sendNext("There's a Hidden Tower in this castle. Numerous people are trapped in the Aerial Prison of that tower. Someone must save them... \r\n#e- Level#n: 120 or above #r(Recommended Level: 120 - 139 )#k  \r\n#e- Time Limit#n: 20 min. \r\n#e- Players#n: 3 to 6 \r\n#e- Reward#n: \r\n#v1132094# #t1132094#\r\n#v1132095# #t1132095#\r\n#v1132096# #t1132096#\r\n#v1132097# #t1132097#\r\n#v1132098# #t1132098#");
		break;
	case 2:
		cm.sendNextPrev("Here's the plan. \r\n1. Evade the obstacles and infiltrate the prison. \r\n2. Eliminate all guards on the map. \r\n3. Make it through the maze and find the prison entrance. \r\n4. Eliminate any guards protecting the prison door. \r\n5. Evade the booby traps and get into the Aerial Prison. \r\n6. Eliminate all guards and find the Prison Key. \r\n7. Defeat Prison Guard Ani and free the prisoners.");
		break;
	case 3:
		cm.dispose();
}
}

function action2(mode, type, selection) {
	switch (status) {
	case 1:
		if (cm.getPlayer().itemQuantity(4001534) < 50) {
			cm.sendNext("#rPrison Guard Keys#k are keys held by the Hidden Tower's Prison Guards. If you bring me #b50#k of them, I'll give you a small gift. Getting so many would mean that you've saved a lot of people, after all. \r\n#b#v1132094# #t1132094#\r\n#v1132095# #t1132095#\r\n#v1132096# #t1132096#\r\n#v1132097# #t1132097#\r\n#v1132098# #t1132098#");
			cm.dispose();
			return;
			}
			cm.sendSimple("It looks you're working hard to free the people trapped in the castle. You must be braver than you look. I'm still quite scared, myself. Hey, I see that you have more than 50 Prison Guard Keys. You can trade 50 of those keys for one of the following. Which one would you like? \r\n#L0##b#v1132094# #t1132094##l\r\n#L1##v1132095# #t1132095##l\r\n#L2##v1132096# #t1132096##l\r\n#L3##v1132097# #t1132097##l\r\n#L4##v1132098# #t1132098##l");
			break;
	case 2:
		if (cm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.EQUIP).getNumFreeSlot() < 1) {
			cm.sendNext("Something is not right. Can you check to see that you have all the required items and that there is an empty slot in your Inventory Equip tab?");
			cm.dispose();
			return;
			}
			cm.gainItem(4001534, -50);
			cm.gainItem(1132094 + selection, 1);
			cm.sendNext("Consider this your reward for courageously helping the people trapped in this dangerous place.");
			cm.dispose();
}
}