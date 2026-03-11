/*
	名字:	[十字獵人] S級獵人之路
	地圖:	回憶中的休息處
	描述:	270010110
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
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(1674)).getStatus() < 1) {
			Packages.server.quest.MapleQuest.getInstance(1674).forceStart(qm.getPlayer(), qm.getNpc(), null);
			qm.dispose();
			return;
			}
			qm.sendNext("I've been waiting! Did you meet the so-called 'legend'? Tell me about him.");
			break;
	case 1:
		qm.sendNextPrevS("There's not much to say. He keeps to himself.", 16);
		break;
	case 2:
		qm.sendNextPrev("Too bad. I know next to nothing about the guy. Anyway, nice work, #h0#. You're now a #bRank S Hunter#k.");
		break;
	case 3:
		qm.sendNextPrev("I only know of three people who have that title. Be proud of yourself. Oh, and here's a little something from me.");
		break;
	case 4:
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(1674)).getStatus() < 2) {
		if (qm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.ETC).getNumFreeSlot() < 1) {
			qm.getClient().getSession().write(Packages.tools.packet.CWvsContext.serverNotice(1, "Etc item inventory is full."));
			qm.dispose();
			return;
			}
			Packages.server.quest.MapleQuest.getInstance(1674).forceComplete(qm.getPlayer(), qm.getNpc());
			qm.gainItem(4310029, 100);
			qm.gainExp(2277740);
			}
			qm.sendNextPrevS("I'll see you the next time something pops up. Until then, take care.", 1);
			break;
	case 5:
		qm.getMap().broadcastMessage(Packages.tools.packet.CField.environmentChange("crossHunter/chapter/end4", 3));
		qm.dispose();
}
}