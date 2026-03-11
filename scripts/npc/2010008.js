/*
	名字:	蕾雅
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
		cm.sendSimple("Hi! My name is #bLea#k. I am in charge of the #bGuild Emblem#k. \r\n#L0##bI'd like to register a guild emblem.#l");
		break;
	case 1:
		if (cm.getPlayer().getGuildRank() != 1) {
			cm.sendOk("You must be the Guild Leader to change the Emblem. Please tell your leader to speak with me.");
			cm.dispose();
			return;
			}
			cm.sendYesNo("There is a fee of 500,000 mesos for creating a Guild Emblem. To further explain, a Guild Emblem is like a coat of arms that is unique to a guild, it will be displayed to the left of the guild name. How does that sound? Would you like to create a Guild Emblem?");
			break;
	case 2:
		cm.genericGuildMessage(18);
		cm.dispose();
}
}