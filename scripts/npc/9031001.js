/*
	名字:	斯塔切
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
		cm.sendNext("Ah, it's smart not to rush into anything. Come back after you've pondered it some more.");
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
		cm.sendSimple("Hello. What can I help you with? " + (cm.getPlayer().getProfessionLevel(92000000) < 1 ? "\r\n#L0#Hear an explanation about #b#eHerbalism#n.#l\r\n#L1#Learn #eHerbalism#n.#l" : "\r\n#L2##bTrade Herb Root.#l") + "");
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
		cm.sendNext("Herbalism is a skill for collecting herbs found throughout the field. If you place the herbs collected in an oil bottle sold by #p9031007# and refine them, they become essential materials for alchemy.");
		break;
	case 2:
		cm.dispose();
}
}

function action1(mode, type, selection) {
	switch (status) {
	case 1:
		if (Math.floor(cm.getPlayer().getJob() / 10 % 10) < 1 || cm.getPlayer().getJob() == 2210 || cm.getPlayer().getJob() == 430) {
			cm.sendOk("I don't think you're ready to learn a Profession. You must be at least #bLv. 30 and have had a 2nd job advancement (3rd for Evan and 2nd for Dual Blade)#k. Come back when you are ready.");
			cm.dispose();
			return;
			}
		if (cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(3199)).getStatus() < 2) {
			cm.sendOk("To learn Herbalism, you have to go to #bGrant#k and take a lecture on the profession. You can meet Grant at the town entrance.");
			cm.dispose();
			return;
			}
			cm.sendYesNo("To learn #bHerbalism#k, you must pay #b5,000 Mesos#k. You sure you want to learn it?");
			break;
	case 2:
		if (cm.getPlayer().getMeso() < 5000) {
			cm.sendNext("Hey, you need #b5000 Mesos#k if you want me to teach you.");
			cm.dispose();
			return;
			}
			cm.gainMeso(-5000);
			cm.gainItem(1502000, cm.getPlayer().itemQuantity(1502000) ? 0 : 1);
			cm.getPlayer().changeSingleSkillLevel(Packages.client.SkillFactory.getSkill(92000000), 0x1000000, 0, -1);
			cm.sendNext("Good, you've successfully learned Herbalism. You can increase your level when your Mastery is full, so please come again.");
			break;
	case 3:
		cm.dispose();
}
}

function action2(mode, type, selection) {
	switch (status) {
	case 1:
		if (cm.getPlayer().itemQuantity(4022023) < 100) {
			cm.sendOk("#b100 #t4022023#s#k can be traded for 1 #b#v2028066##t2028066##k. Please collect more Herb Roots.");
			cm.dispose();
			return;
			}
			cm.sendGetNumber("How many Saffron's Herb Pouches would you like? \r\n\r\n#b100 #t4022023#s#k can be traded for #b#v2028066# 1 #t2028066##k.", 1, 1, 100);
			break;
	case 2:
		if (cm.getPlayer().itemQuantity(4022023) < (100 * selection) || cm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.USE).getNumFreeSlot() < 1) {
			cm.sendNext("The trade failed because you either don't have enough Herb Root, or your Inventory USE tab is full.");
			cm.dispose();
			return;
			}
			cm.gainItem(2028066, selection);
			cm.gainItem(4022023, -(100 * selection));
			cm.sendNext("Thank you for the Herb Roots.");
			break;
	case 3:
		cm.dispose();
}
}