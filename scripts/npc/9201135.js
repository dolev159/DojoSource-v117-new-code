/*
	名字:	Audrey
	地圖:	中心商務區
	描述:	540000000
*/

var map = [540000000, 550000000, 551000000];

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
		var chat = "Where would you like to travel? #b";
		for (var i = 0; i < map.length; i++)
		if (map[i] != cm.getPlayer().getMap().getId())
		chat += "\r\n#L" + i + "##b#m" + map[i] + "# (1000 mesos)#l";
		cm.sendSimple(chat);
		break;
	case 1:
		cm.sendYesNo("Would you like to travel to #b#m" + map[selection] + "##k? To head over to Trend Zone Metropolis, it'll cost you only #b1,000 mesos#k. Would you like to go right now?");
		select = selection;
		break;
	case 2:
		if (cm.getPlayer().getMeso() < 1000) {
			cm.sendOk("You don't have enough mesos.");
			cm.dispose();
			return;
			}
			cm.gainMeso(-1000);
			cm.getPlayer().changeMap(cm.getMap(map[select]), cm.getMap(map[select]).getPortal(0));
			cm.dispose();
}
}