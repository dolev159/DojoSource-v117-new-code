/*
	名字:	雷克斯
	地圖:	冰雪峽谷4
	描述:	921121000
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
		status--;
		break;
	case 1:
		status++;
		break;
		}
	switch (status) {
	case 0:
		cm.sendNextS("#bSo this is Rex the Hoblin King's Seal.", 2);
		break;
	case 1:
		cm.sendNextPrevS("#b(Rex, who can be seen through the Ice, looks peaceful in his sleep. It's hard to imagine that he was once a viclent warrior who terrorized El Nath...)", 2);
		break;
	case 2:
		cm.sendNextPrevS("#bNothing is wrong with the Seal. Shammos was worried for nothing. Time to return.", 2);
		break;
	case 3:
		cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(3122)).setCustomData(1);
		cm.getPlayer().updateQuest(cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(3122)), true);
		cm.dispose();
}
}