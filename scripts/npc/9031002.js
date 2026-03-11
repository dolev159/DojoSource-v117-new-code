/*
	名字:	諾本
	地圖:	專業技術村 &amp;lt;梅斯特鎮&gt;
	描述:	910001000
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
		if (status < 2) {
		cm.sendNext("It's good to be cautious. Come back after you've thought it through.");
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
		cm.sendSimple("Yes, I'm #bCole#k, the Master of Mining. What can I do for you? " + (cm.getPlayer().getProfessionLevel(92010000) < 1 ? "\r\n#L0##bHear an explanation about #eMining#n.#l\r\n#L1#Learn #eMining#n.#l" : "\r\n#L2##bTrade Ore Fragment.#l") + "");
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
		cm.sendNext("Mining is a skill for collecting ores found throughout the field. If you place the ores collected in a mold sold by Nack and refine them, they become essential materials for alchemy.");
		break;
	case 2:
		cm.dispose();
}
}

function action1(mode, type, selection) {
	switch (status) {
	case 1:
		if (Math.floor(cm.getPlayer().getJob() / 10 % 10) < 1 || cm.getPlayer().getJob() == 2210 || cm.getPlayer().getJob() == 430) {
			cm.sendOk("Slow down there! I'll be more than happy to teach you a Profession when you're #bLv. 30, and have had your 2nd job advancement (3rd for Evan and 2nd for Dual Blade)#k. Come back when you're ready.");
			cm.dispose();
			return;
			}
		if (cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(3199)).getStatus() < 2) {
			cm.sendOk("To learn Mining, you should go to #bGrant#k and introduce yourself. You can meet Grant at the town entrance.");
			cm.dispose();
			return;
			}
			cm.sendYesNo("Do you really want to learn #bMining#k? It'll cost you some money... #b5,000 Mesos#k, to be exact.");
			break;
	case 2:
		if (cm.getPlayer().getMeso() < 5000) {
			cm.sendNext("You don't got enough Mesos. I need #b5000 Mesos#k from every student, no exceptions.");
			cm.dispose();
			return;
			}
			cm.gainMeso(-5000);
			cm.gainItem(1512000, cm.getPlayer().itemQuantity(1512000) ? 0 : 1);
			cm.getPlayer().changeSingleSkillLevel(Packages.client.SkillFactory.getSkill(92010000), 0x1000000, 0, -1);
			cm.sendNext("Okay, them's the basics of Mining. Work on increasing your Mastery, and I'll teach you some new tricks.");
			break;
	case 3:
		cm.dispose();
}
}

function action2(mode, type, selection) {
	switch (status) {
	case 1:
		if (cm.getPlayer().itemQuantity(4011010) < 100) {
			cm.sendOk("You can trade #b#t4011010# x100#k for #b#v2028067##t2028067# x1#k. Bring more of that Ore Fragment.");
			cm.dispose();
			return;
			}
			cm.sendGetNumber("How many Cole's Mineral Pouches you want? \r\n\r\n#b100 #t4011010#s#k can be traded for #b#v2028067# 1 #t2028067##k.", 1, 1, 100);
			break;
	case 2:
		if (cm.getPlayer().itemQuantity(4011010) < (100 * selection) || cm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.USE).getNumFreeSlot() < 1) {
			cm.sendNext("The trade failed because you either don't have enough Ore Fragment, or your Use tab is full.");
			cm.dispose();
			return;
			}
			cm.gainItem(2028067, selection);
			cm.gainItem(4011010, -(100 * selection));
			cm.sendNext("Thanks for the Ore Fragment.");
			break;
	case 3:
		cm.dispose();
}
}