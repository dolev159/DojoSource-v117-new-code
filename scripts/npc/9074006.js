/*
	名字:	奇怪的相框
	地圖:	埃德爾斯坦
	描述:	956010100
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
		cm.sendSimple("Would you like to escape to the real world? If you leave, all quests currently in progress will reset. \r\n\r\n#L0##bStay here.#l\r\n#L1#Get me out of here!#l");
		break;
	case 1:
		if (selection == 0) {
			cm.dispose();
			return;
			}
			cm.sendYesNo("You're going to leave? Once you leave, all quests will reset.");
			break;
	case 2:
		cm.dispose();
		cm.getClient().getSession().write(Packages.tools.packet.CWvsContext.serverNotice(5, "Now returning to the Gonzo Gallery."));
		cm.getPlayer().changeMap(cm.getMap(956000000), cm.getMap(956000000).getPortal(0));
}
}