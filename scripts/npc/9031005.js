/*
	名字:	卡力安
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
		cm.sendNext("Think carefully before you choose a Profession. Such things take effort and time, after all. Come see me when you are ready.");
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
		cm.sendSimple("Hello, are you interested in Alchemy? " + (cm.getPlayer().getProfessionLevel(92040000) < 1 ? "\r\n#L0##bListen to an explanation about #eAlchemy#n.#l\r\n#L1#Learn #eAlchemy#n.#l" : "\r\n#L2##bIncrease the #eAlchemy#n level.#l") + "");
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
		cm.sendNext("Alchemy is the skill of making various potions using herb oil. You can make various potions that make you stronger, or restore HP and MP. You can also make other amazing potions that you've never experienced before.");
		break;
	case 2:
		cm.dispose();
}
}

function action1(mode, type, selection) {
	switch (status) {
	case 1:
		if (Math.floor(cm.getPlayer().getJob() / 10 % 10) < 1 || cm.getPlayer().getJob() == 2210 || cm.getPlayer().getJob() == 430) {
			cm.sendOk("I can teach you Alchemy after you reach #bLv. 30 and have had a 2nd job advancement (3rd for Evan and 2nd + for Dual Blade#k. Come see me then.");
			cm.dispose();
			return;
			}
		if (cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(3199)).getStatus() < 2) {
			cm.sendOk("I'd love to teach you, but first you must learn about Professions from Grant. It's a town policy.");
			cm.dispose();
			return;
			}
		if (cm.getPlayer().getProfessionLevel(92000000) < 1) {
			cm.sendOk("I can teach you Alchemy after you learn Herbalism. If you go to the right, you can learn Herbalism from #bSaffron#k, the Herbalism Master, who is putting herbs into a pot.");
			cm.dispose();
			return;
			}
			cm.sendYesNo("Do you really want to learn #bAlchemy#k? \r\nYou must pay #b5,000 Mesos#k to learn this Profession.");
			break;
	case 2:
		if (cm.getPlayer().getMeso() < 5000) {
			cm.sendNext("Umm... I don't think you have enough money... I'm sorry, but please bring #b5000 Mesos#k.");
			cm.dispose();
			return;
			}
			cm.gainMeso(-5000);
			cm.getPlayer().changeSingleSkillLevel(Packages.client.SkillFactory.getSkill(92040000), 0x1000000, 0, -1);
			cm.sendNext("Congratulations! You are now an Alchemist. Brew up some potions to increase your Mastery. When you're ready, I'll teach you something new.");
			break;
	case 3:
		cm.dispose();
}
}

function action2(mode, type, selection) {
	switch (status) {
	case 1:
		cm.sendNext("You're not ready to learn more Alchemy yet. Work on improving your Mastery first.");
		break;
	case 2:
		cm.dispose();
}
}