/*
	名字:	緊急請求
	地圖:	特魯的情報商店
	描述:	104000004
*/

var status = -1;

function start(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		if (status < 1) {
		qm.sendNext("Hey, now's not the time for jokes!");
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
		qm.sendAcceptDecline("Phantom! A mysterious ship was spotted on its way to Rien! It might be the Black Wings! I told #p1404002# about it, but could I think they could use your help too. I'll send you to Rien right away if you want!");
		break;
	case 1:
		qm.sendNextS("#p1404002# and #p1404001# are more than capable, but a few helping hands couldn't hurt, right?", 1);
		break;
	case 2:
		Packages.server.quest.MapleQuest.getInstance(25426).forceStart(qm.getPlayer(), qm.getNpc(), null);
		qm.getPlayer().changeMap(qm.getMap(140020000), qm.getMap(140020000).getPortal(0));
		qm.dispose();
}
}