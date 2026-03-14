/*
	名字:	雅莉達的肖像畫
	地圖:	宮殿後走廊
	描述:	956020000
*/

var status = -1;

function end(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
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
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(1720)).getStatus() < 1) {
			Packages.server.quest.MapleQuest.getInstance(1720).forceStart(qm.getPlayer(), qm.getNpc(), null);
			qm.dispose();
			return;
			}
			qm.gainExp(3593);
			qm.gainItem(4033210, -1);
			Packages.server.quest.MapleQuest.getInstance(1720).forceComplete(qm.getPlayer(), qm.getNpc());
			qm.sendOk("M-my goodness. Mmmm... MMMM. I cannot believe such a deliciously tempting enchantress could even exist! Simply amazing! If I hadn't prepared with seventeen hours of intense meditation beforehand, I would have gone BLIND!!");
			break;
	case 1:
		qm.dispose();
}
}