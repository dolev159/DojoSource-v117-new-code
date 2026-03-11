/*
	名字:	猶利塔
	地圖:	猶利塔的痕跡
	描述:	926110500
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
		cm.getClient().getSession().write(Packages.tools.packet.CWvsContext.serverNotice(6, "With the glasses removed, Yulete seems to be coming into senses."));
		cm.sendSimple("I can't believe this... all these years I have worked on... going down in flames... \r\n#L0##bYou didn't lose anything. The main thing is that you are alive, which means you can still start over.#l");
		break;
	case 1:
		cm.sendSimple("Really... can I really... start over...? \r\n#L0##bWe will make sure that your great work will not go unnoticed.#l");
		break;
	case 2:
		cm.sendNext("Yes... you are right... if someone is really helping me out, then... maybe I can start over again...");
		break;
	case 3:
		cm.sendNextPrev("I will come out of the underground and reveal the results of my work to the Society. Maybe this will help break the ice between Zenumist and Alcadno.");
		break;
	case 4:
		cm.sendNextPrev("I will now send you to different place.");
		break;
	case 5:
		Packages.server.quest.MapleQuest.getInstance(7072).forceStart(cm.getPlayer(), 0, 1);
		cm.getPlayer().changeMap(cm.getMap(926110600), cm.getMap(926110600).getPortal(0));
		cm.dispose();
}
}