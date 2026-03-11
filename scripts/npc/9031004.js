/*
	名字:	梅爾茨
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
		cm.sendNext("What? Why not?! I was looking forward to sharing my knowledge with you!");
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
		cm.sendSimple("I, #bIntaglio#k, am an aficionado of precious jewels. I simply lose track of time as I admire these sparkling baubles. Hmm! Are you interested in jewels too? You don't seem like you do! " + (cm.getPlayer().getProfessionLevel(92030000) < 1 ? "\r\n#L0#Hear an explanation about #b#eAccessory Crafting#n.#l\r\n#L1#Learn #eAccessory Crafting#n.#l" : "\r\n#L2##bIncrease the #eAccessory Crafting#n level.#l") + "");
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
		cm.sendNext("To learn about Accessory Crafting, you must first start by understanding the beauty of jewels, I could go on forever, but I'll keep this short... \r\nAccessory Crafting is simple. It's about polishing jewels and minerals to make them into accessories to bring out their true beauty. Through this process, their hidden powers are unleashed to make you stronger and more beautiful.");
		break;
	case 2:
		cm.dispose();
}
}

function action1(mode, type, selection) {
	switch (status) {
	case 1:
		if (Math.floor(cm.getPlayer().getJob() / 10 % 10) < 1 || cm.getPlayer().getJob() == 2210 || cm.getPlayer().getJob() == 430) {
			cm.sendOk("You are not ready for Accessory Crafting. Before I can teach you Accessory Crafting, Smithing, or Alchemy, you must be #bLv. 30 and have had a 2nd job advancement (3rd for Evan and 2nd + for Dual Blade)#k. For now, we must wait.");
			cm.dispose();
			return;
			}
		if (cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(3199)).getStatus() < 2) {
			cm.sendOk("You're interested in Accessory Crafting? Hmm! Then, you should go to #bGrant#k and introduce yourself. He's at the town entrance. Go see him!");
			cm.dispose();
			return;
			}
		if (cm.getPlayer().getProfessionLevel(92010000) < 1) {
			cm.sendOk("Oh, no. You simply MUST learn Mining from #bCole#k before I can teach you to be a Jeweler. He'll teach you how to get all the minerals and jewels you need to make shining, glowing accessories.");
			cm.dispose();
			return;
			}
			cm.sendYesNo("Oh, you're ready to learn #bAccessory Crafting#k? \r\nSince you're so cute, I'll give you a discount. #b5,000 Mesos#k to become my student.");
			break;
	case 2:
		if (cm.getPlayer().getMeso() < 5000) {
			cm.sendNext("You don't have #b5000 Mesos#k? I wish I could, but I just can't teach you for free.");
			cm.dispose();
			return;
			}
			cm.gainMeso(-5000);
			cm.getPlayer().changeSingleSkillLevel(Packages.client.SkillFactory.getSkill(92030000), 0x1000000, 0, -1);
			cm.sendNext("Oh! Wonderful! And that's how you do Accessory Crafting. Practice, practice, practice, and when you've gained enough Mastery, I'll teach you some more.");
			break;
	case 3:
		cm.dispose();
}
}

function action2(mode, type, selection) {
	switch (status) {
	case 1:
		cm.sendNext("Oh, you're not ready to level up your Profession just yet. Keep at it, though!");
		break;
	case 2:
		cm.dispose();
}
}