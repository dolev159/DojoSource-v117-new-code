/*
	名字:	瑪妮
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
		if (status < 1) {
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
		cm.sendSimple("Are you here because you heard about the Monkey Temple inside the Golden Temple? \r\n\r\n#L0##bI want to enter the Monkey Temple.#l\r\n#L1#Please tell me more about the Monkey Temple.#l");
		break;
	case 1:
		if (selection > 0) {
			cm.sendOk("This is a forest where the monkeys outside of the Golden Temple live. \r\n\r\n1. Benefits of the Monkey Temple \r\n#b- Yields more EXP than other monsters of the same level \r\n- Drops various scrolls#k \r\n\r\n2. How to obtain the Golden Ticket required to enter \r\n- Mr. Yoo's quest can be completed once per day \r\n- Freely enter once per hour if you possess a Premium Golden Ticket.");
			cm.dispose();
			return;
			}
			map = cm.getPlayer().getMap().getId();
			var chat = "Which temple do you wish to enter? And you know that must enter alone, right? #b";
			chat += "\r\n#L0#Monkey Temple 1 (Lv. " + (map == 950100000 ? 15 : 120) + " Wild Monkey)";
			chat += "\r\n#L1#Monkey Temple 2 (Lv. " + (map == 950100000 ? 21 : 112) + " Mama Monkey)";
			chat += "\r\n#L2#Monkey Temple 3 (Lv. " + (map == 950100000 ? 27 : 104) + " White Baby Monkey)";
			chat += "\r\n#L3#Monkey Temple 4 (Lv. " + (map == 950100000 ? 34 : 96) + " White Mama Monkey)";
			cm.sendSimple(chat);
			break;
	case 2:
		if (cm.getPlayer().itemQuantity(4001431) || cm.getPlayer().itemQuantity(4001432)) {
			for (var i = 0; i < 50; i++)
		if (cm.getMap((map + 100 + (selection * 100)) + i).getCharacters().size() < 1) {
			cm.gainItem(4001431, cm.getPlayer().itemQuantity(4001432) ? 0 : -1);
			cm.getPlayer().changeMap(cm.getMap((map + 100 + (selection * 100)) + i), cm.getMap((map + 100 + (selection * 100)) + i).getPortal(1));
			cm.dispose();
			return;
			}
			cm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "Try again soon."));
			cm.dispose();
			return;
			}
			cm.sendOk("I'm sorry but you can't enter the Monkey Temple without a ticket. Let me explain the Monkey Temple to you again so you can understand how to obtain a ticket.");
			cm.dispose();
}
}