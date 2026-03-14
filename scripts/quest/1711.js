/*
	名字:	製作油油亮亮的鬍子
	地圖:	埃德爾斯坦
	描述:	956010100
*/

var status = -1;

function end(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		if (status < 1) {
		qm.dispose();
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
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(1711)).getStatus() < 1) {
			Packages.server.quest.MapleQuest.getInstance(1711).forceStart(qm.getPlayer(), qm.getNpc(), null);
			qm.dispose();
			return;
			}
			qm.sendSimple("Did you get my Dapper Drips? I neeeeeed them. \r\n\r\n#L0##bI got you 10#k like you asked.#l");
			break;
	case 1:
		qm.gainExp(6832);
		qm.gainItem(4033202, -10);
		Packages.server.quest.MapleQuest.getInstance(1711).forceComplete(qm.getPlayer(), qm.getNpc());
		qm.sendNext("GOOD, good. Once my new nose-broom arrives, my spring fashion will be complete! Speaking of which... why isn't it here yet?!");
		break;
	case 2:
		qm.dispose();
}
}