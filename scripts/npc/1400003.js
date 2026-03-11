/*
	名字:	修爾茲
	地圖:	主控室
	描述:	150010100
*/

var name = ["Victoria Island Station", "Ereve Sky Ferry", "Orbis Station", "Ludibrium Station", "Ariant Station", "Leafre Station", "Edelstein"];

var map = [104020100, 130000210, 200000100, 220000100, 260000100, 240000100, 310000010];

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
		if (status > 0) {
		cm.sendNext("Ah, so you wish to go somewhere else. Please tell me your destination.");
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
		var chat = "Welcome aboard. Please let me know where you would like to go. Once we arrive, use the portal on the left to leave the ship.";
		for (var i = 0; i < map.length; i++)
		chat += "\r\n#L" + i + "##b" + name[i] + "#l";
		cm.sendSimple(chat);
		break;
	case 1:
		select = selection;
		cm.sendYesNo("Would you like to go directly to " + name[select] +"?");
		break;
	case 2:
		cm.dispose();
		cm.getMap(150000001).setTimeLimit(30);
		cm.getMap(150000001).setForcedReturnMap(150000000);
		cm.getPlayer().changeMap(cm.getMap(150000001), cm.getMap(150000001).getPortal(0));
		Packages.server.quest.MapleQuest.getInstance(25010).forceStart(cm.getPlayer(), 0, map[select]);
}
}