/*
	名字:	圖書館員 懷玆
	地圖:	赫爾奧斯塔圖書館
	描述:	222020000
*/

var questid = new Array(3615, 3616, 3617, 3618, 3920, 3630, 3633, 3639);
var questitem = new Array(4031235, 4031236, 4031237, 4031238, 4031591, 4031270, 4031280, 4031298);

var num = 0;

var books = "";

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
		status--;
		break;
	case 1:
		status++;
		break;
		}
	switch (status) {
	case 0:
		if (num < 1) {
			for (i = 0; i < questid.length; i++)
		if (cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(questid[i])).getStatus() > 1) {
			books += "\r\n#v" + questitem[i] + "##t" + questitem[i] + "#";
			num += 1;
			}
			}
		if (num < 1) {
			cm.sendOk("#b#h0##k has not returned a single storybook yet.");
			cm.dispose();
			return;
			}
			cm.sendNext("Let's see.. #b#h ##k have returned a total of #b" + num + "#k books. The list of returned books is as follows: \r\n#b" + books);
			break;
	case 1:
		cm.sendNextPrev("The library is settling down now thanks chiefly to you, #b#h0##k's immense help. If the story gets mixed up once again, then I'll be counting on you to fix it once more.");
		break;
	case 2:
		cm.dispose();
}
}