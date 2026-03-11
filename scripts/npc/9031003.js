/*
	名字:	愛爾森
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
		cm.sendSimple("Yes, I'm #bGere#k, the Master of Smithing. What can I do for you? " + (cm.getPlayer().getProfessionLevel(92020000) < 1 ? "\r\n#L0#Hear an explanation about #b#eSmithing#n.#l\r\n#L1#Learn #eSmithing#n.#l" : "\r\n#L2##bIncrease the #eSmithing#n level.#l") + "");
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
		cm.sendNext("Smithing is the art of forging the minerals and gems you get from Mining into durable armor and punishing weapons. I'll show you how to shape these raw materials into equipment you've never seen before.");
		break;
	case 2:
		cm.dispose();
}
}

function action1(mode, type, selection) {
	switch (status) {
	case 1:
		if (Math.floor(cm.getPlayer().getJob() / 10 % 10) < 1 || cm.getPlayer().getJob() == 2210 || cm.getPlayer().getJob() == 430) {
			cm.sendOk("What makes you think you're ready to study Smithing? You must be at least #bLv. 30 and have had a 2nd job advancement (3rd for Evan and 2nd + for Dual Blade)#k to learn Smithing, Accessory Crafting, and Alchemy. Come back when you are ready.");
			cm.dispose();
			return;
			}
		if (cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(3199)).getStatus() < 2) {
			cm.sendOk("You're interested in Smithing. Then, you should go to #bGrant#k and introduce yourself. You can meet Grant at the town entrance.");
			cm.dispose();
			return;
			}
		if (cm.getPlayer().getProfessionLevel(92010000) < 1) {
			cm.sendOk("How do you plan to learn Smithing if you don't even know the Mining Profession? Seek out #bCole#k, learn what he has to teach. Then maybe you will be ready.");
			cm.dispose();
			return;
			}
			cm.sendYesNo("You want to learn #bSmithing#k? Show me how earnest you are by coughing up some dough! \r\nIt's #b5,000 Mesos#k... Are you really ready to do this?");
			break;
	case 2:
		if (cm.getPlayer().getMeso() < 5000) {
			cm.sendNext("If you can't even gather #b5000 Mesos#k, how can you hope to become a Blacksmith?");
			cm.dispose();
			return;
			}
			cm.gainMeso(-5000);
			cm.getPlayer().changeSingleSkillLevel(Packages.client.SkillFactory.getSkill(92020000), 0x1000000, 0, -1);
			cm.sendNext("To be honest, I didn't think you could learn Smithing. Well, you've only learned the most basic skill level. If you can manage to increase your Mastery, I can teach you more.");
			break;
	case 3:
		cm.dispose();
}
}

function action2(mode, type, selection) {
	switch (status) {
	case 1:
		cm.sendNext("You're not ready to level up your Profession. Come back when you've increased your Mastery.");
		break;
	case 2:
		cm.dispose();
}
}