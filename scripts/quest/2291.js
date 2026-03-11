/*
	名字:	VIP地區入場
	地圖:	7層8層 A區域
	描述:	103040400
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
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(2291)).getStatus() != 1) {
			Packages.server.quest.MapleQuest.getInstance(2291).forceStart(qm.getPlayer(), qm.getNpc(), null);
			qm.dispose();
			return;
			}
			qm.sendYesNo("Have you collected all of the VIP Tickets? If so, please give them to me. I will let you enter the #bVIP Zone#k. Just to let you know, you can only use the VIP Zone #bonce every 30 minutes#k.");
			break;
	case 1:
		var em = qm.getEventManager("KerningSquareVIP");
		var prop = em.getProperty("state");
		if (prop == null || prop == 0) {
			qm.gainItem(4032521, -10);
			Packages.server.quest.MapleQuest.getInstance(2291).forceComplete(qm.getPlayer(), qm.getNpc());
			em.startInstance(qm.getPlayer());
			qm.dispose();
			return;
			}
			qm.sendNext("Uh... It looks like the rooms ahead are a bit crowded right now. Please wait around here for a bit, ok?");
			qm.dispose();
}
}