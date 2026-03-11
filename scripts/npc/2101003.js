/*
	名字:	亞廷
	地圖:	納希民宅
	描述:	260000200
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
		cm.sendNext("Then what are you here for? If you don't have any business here, I suggest you leave. Otherwise, the guards will notice me.");
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
		if (cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(3933)).getStatus() != 1) {
			cm.sendNext("Hey, hey! Don't start any trouble with anyone. I want nothing to do with you.");
			cm.dispose();
			return;
			}
			cm.sendYesNo("Ah, you're back. I'm sorry about last time. Someone else was using the Arena. Are you here to prove your worth against me?");
			break;
	case 1:
		cm.sendNext("Of course, you've thought long and hard about this, right? Shall we start?");
		break;
	case 2:
		if (cm.getMap(926000000).getCharacters().size() < 1) {
			cm.getMap(926000000).resetFully();
			cm.getPlayer().changeMap(cm.getMap(926000000), cm.getMap(926000000).getPortal(1));
			cm.getPlayer().startMapTimeLimitTask(900, cm.getMap(260000200));
			cm.dispose();
			return;
			}
			cm.sendOk("Ah... please wait. I think someone else is in there right now. Please come back in a bit.");
			cm.dispose();
}
}