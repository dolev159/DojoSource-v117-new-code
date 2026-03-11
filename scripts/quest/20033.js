/*
	名字:	搬移閣樓房間的東西
	地圖:	林伯特家的雜貨店
	描述:	913070003
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
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(20033)).getStatus() < 1) {
			Packages.server.quest.MapleQuest.getInstance(20033).forceStart(qm.getPlayer(), qm.getNpc(), null);
			qm.dispose();
			return;
			}
			qm.sendSimple("Where's the eggs? I told you to get eggs. If you broke them... Wait a second, what happened to you? \r\n\r\n#L0##bUh, well, you know how you told me not to mess with Bigby? Well... I kinda... he got out.#l");
			break;
	case 1:
		qm.sendNext("What?!! I swear to every deity I can think of, you will starve to death if that dog is not in my yard by dinnertime.");
		break;
	case 2:
		qm.dispose();
		qm.gainExp(372);
		qm.gainExp(560);
		qm.gainItem(4033196, -10);
		qm.gainItem(2000016, 30);
		qm.gainItem(2000018, 30);
		Packages.server.quest.MapleQuest.getInstance(20033).forceComplete(qm.getPlayer(), qm.getNpc());
		qm.getPlayer().changeMap(qm.getMap(913070004), qm.getMap(913070004).getPortal(0));
}
}