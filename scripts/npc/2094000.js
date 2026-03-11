/*
	名字:	邱翁
	地圖:	海盜船境地
	描述:	251010404
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
		cm.sendSimple("#e<Party Quest: Dimensional Crack>#n \r\nYou can't go any higher because of the extremely dangerous creatures above. Would you like to collaborate with party members to complete the quest? If so, please have your #bparty leader#k talk to me. \r\n#L0##bI want to participate in the party Quest.#l\r\n#L1#I want to find party members.#l\r\n#L2#I want to listen to the explanation.#l\r\n#L3#I want to get a Lord Pirate Hat.#l");
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
			cm.sendNext("I need your representative to talk to me.");
			cm.dispose();
			return;
			}
			party = cm.getPlayer().getParty().getMembers();
			for (var i = 0; i < party.size(); i++)
		if (party.size() < 3) {
			cm.sendNext("You can't participate in this quest because the party you belong to does not have at least 3 party members. Adjust the party member count so that you have at least 3 members in the party.");
			cm.dispose();
			return;
			}
			for (var i = 0; i < party.size(); i++)
		if (party.get(i).getMapid() != 251010404) {
			cm.sendNext("Some of your party members are in a different map. Make sure they're all here!");
			cm.dispose();
			return;
			}
			for (var i = 0; i < party.size(); i++)
		if (party.get(i).getLevel() < 70) {
			cm.sendNext("Someone in your party is under Lv. 70. Get some levels under your belt before challenging the Lord Pirate.");
			cm.dispose();
			return;
			}
			var em = cm.getEventManager("Pirate");
			var prop = em.getProperty("state");
		if (prop == null || prop == 0) {
			em.startInstance(cm.getPlayer().getParty(), cm.getPlayer().getMap(), 200);
			cm.dispose();
			return;
			}
			cm.sendNext("There's another party already doing this quest. Try again later.");
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
		cm.sendNext("#b#m251000000##k, where Bellflowers live, has been attacked by the #r#o9300119##k, and #b#p2094001##k, the king of the Bellflowers, has been kidnapped. Gather your allies and attack the pirate ship to drive the #o9300119# and his men away. \r\n#e- Level#n: 70 or above \r\n#e- players#n: 3 to 6 \r\n#e- Reward#n: #v1002573# #b#t1002573##k");
		break;
	case 2:
		cm.dispose();
}
}

function action3(mode, type, selection) {
	switch (status) {
	case 1:
		cm.sendSimple("Thank you for saving #bWu Yang#k from the #bLord Pirate#k. As a reward, l will make you a #bLord Pirate Hat#k if you bring me Hat Fragments. Now, exactly which hat would you like? \r\n#L4##v1002573# #b#t1002573# \r\n#r(Need 100 Lord Pirate Hat Fragments).#l\r\n#L5##v1002574# #b#t1002574# \r\n#r(Need 1 Average Lord Pirate Hat, \r\n200 Lord Pirate Hat Fragments).#l\r\n#L6##v1003267# #b#t1003267# \r\n#r(Need 1 Acceptable Lord Pirate Hat, \r\n1000 Lord Pirate Hat Fragments).#l");
		break;
	default:
		if (status == 2 && type == 5) select = selection;
		reactor = 'action' + select;
		eval(reactor)(mode, type, selection);
}
}

function action4(mode, type, selection) {
	switch (status) {
	case 2:
		cm.sendNext("Do you want me to make a Lord Pirate Hat for you? You did bring enough Hat Fragments, right?");
		break;
	case 3:
		if (cm.getPlayer().itemQuantity(4001455) < 100) {
			cm.sendOk("You need 100 more Hat Fragments if you want me to make you a hat.");
			cm.dispose();
			return;
			}
		if (cm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.EQUIP).getNumFreeSlot() < 1) {
			cm.sendOk("It seems like you have no slots available in your Inventory. Could you check again?");
			cm.dispose();
			return;
			}
			cm.gainItem(4001455, -100);
			cm.gainItem(1002573, 1);
			cm.dispose();
}
}

function action5(mode, type, selection) {
	switch (status) {
	case 2:
		cm.sendNext("Do you want to enhance your #b#t1002573##k? Keep in mind, if you do, you'll lose any potential that is currently on it. Is that okay?");
		break;
	case 3:
		if (cm.getPlayer().itemQuantity(4001455) < 200 || cm.getPlayer().itemQuantity(1002573) < 1) {
			cm.sendOk("I need more Hat Fragments to enhance your Lord Pirate Hat. I think a total of 60 Hat Fragments and #v1002573# 1 Common Lord Pirate Hat should do the trick.");
			cm.dispose();
			return;
			}
		if (cm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.EQUIP).getNumFreeSlot() < 1) {
			cm.sendOk("It seems like you have no slots available in your Inventory. Could you check again?");
			cm.dispose();
			return;
			}
			cm.gainItem(4001455, -100);
			cm.gainItem(1002573, -1);
			cm.gainItem(1002574, 1);
			cm.dispose();
}
}

function action6(mode, type, selection) {
	switch (status) {
	case 2:
		cm.sendNext("Do you want to enhance your #b#t1002574##k? Keep in mind, if you do, you'll lose any potential that is currently on it. Is that okay?");
		break;
	case 3:
		if (cm.getPlayer().itemQuantity(4001455) < 1000 || cm.getPlayer().itemQuantity(1002574) < 1) {
			cm.sendOk("I need more Hat Fragments to enhance your Lord Pirate Hat. I think a total of 60 Hat Fragments and #v1002573# 1 Common Lord Pirate Hat should do the trick.");
			cm.dispose();
			return;
			}
		if (cm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.EQUIP).getNumFreeSlot() < 1) {
			cm.sendOk("It seems like you have no slots available in your Inventory. Could you check again?");
			cm.dispose();
			return;
			}
			cm.gainItem(4001455, -1000);
			cm.gainItem(1002574, -1);
			cm.gainItem(1003267, 1);
			cm.dispose();
}
}