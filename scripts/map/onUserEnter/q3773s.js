/*
	名字:	奈歐市&amp;lt;2099年&gt;
	地圖:	夜晚的港灣入口
	描述:	240070210
*/

var quest = true;

var status;

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	switch (mode) {
	case -1:
		ms.dispose();
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
		if (ms.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(3773)).getStatus() > 0 && quest) {
			ms.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(8140510), new java.awt.Point(250, 90));
			ms.dispose();
			return;
			}
		if (ms.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(3773)).getStatus() < 1) {
			ms.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(8140510), new java.awt.Point(250, 90));
			Packages.server.quest.MapleQuest.getInstance(3773).forceStart(ms.getPlayer(), ms.getNpc(), null);
			quest = false;
			}
			ms.sendNextS("The year 2099, huh? It's a little bit different from 2021. Or maybe it's just me...", 17);
			break;
	case 1:
		ms.sendPrevS("That beast is undefeatable! Maybe #p2082004# can help me think of a better strategy.", 17);
		break;
	case 2:
		ms.dispose();
}
}