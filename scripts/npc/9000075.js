/*
	名字:	守衛兵
	地圖:	黃金寺廟
	描述:	950100000
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
		cm.sendSimple("What do you want? Please step aside. \r\n\r\n#L0##bI want to enter the Goblin Cave.#l\r\n#L1#Please tell me more about the Goblin Cave.#l");
		break;
	case 1:
		if (selection > 0) {
			cm.sendOk("This is a Cave where the Goblins outside of the Golden Temple live. \r\n\r\n1. Benefits of the Goblin Cave \r\n#b- Yields more EXP than other monsters of the same level \r\n- Drops Sunburst#k \r\n\r\n2. How to obtain the Golden Ticket required to enter \r\n- Mr. Yoo's quest can be completed once per day \r\n- Freely enter once per hour if you possess a Premium Golden Ticket.");
			cm.dispose();
			return;
			}
			map = cm.getPlayer().getMap().getId();
			var chat = "You need a Golden Ticket to enter. You can only enter when you're alone, too. Where do you want to go? #b";
			chat += "\r\n#L0#Goblin Temple 1 (Lv. " + (map == 950100000 ? 43 : 86) + " Blue Goblin)";
			chat += "\r\n#L1#Goblin Temple 2 (Lv. " + (map == 950100000 ? 54 : 78) + " Red Goblin)";
			chat += "\r\n#L2#Goblin Temple 3 (Lv. " + (map == 950100000 ? 66 : 70) + " Stone Goblin)";
			cm.sendSimple(chat);
			break;
	case 2:
		if (cm.getPlayer().itemQuantity(4001431) || cm.getPlayer().itemQuantity(4001432)) {
			for (var i = 0; i < 50; i++)
		if (cm.getMap((map + 500 + (selection * 100)) + i).getCharacters().size() < 1) {
			cm.gainItem(4001431, cm.getPlayer().itemQuantity(4001432) ? 0 : -1);
			cm.getPlayer().changeMap(cm.getMap((map + 500 + (selection * 100)) + i), cm.getMap((map + 500 + (selection * 100)) + i).getPortal(1));
			cm.dispose();
			return;
			}
			cm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "Try again soon."));
			cm.dispose();
			return;
			}
			cm.sendOk("I'm sorry but you can't enter the Goblin Cave without a ticket. Let me explain the Goblin Cave to you again so you can understand how to obtain a ticket.");
			cm.dispose();
}
}