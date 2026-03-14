/*
	名字:	帥哥的必需品
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
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(1715)).getStatus() < 1) {
			Packages.server.quest.MapleQuest.getInstance(1715).forceStart(qm.getPlayer(), qm.getNpc(), null);
			qm.dispose();
			return;
			}
			qm.sendSimple("Where's the comb? Tell me! Tell me where the comb is! \r\n\r\n#L0##bIt's here! Take it. Here's your Suaveness Comb.#l");
			break;
	case 1:
		qm.gainExp(20496);
		qm.gainItem(4033200, -1);
		Packages.server.quest.MapleQuest.getInstance(1715).forceComplete(qm.getPlayer(), qm.getNpc());
		qm.sendNext("How does it look? It's even shinier now that the bristles are all separated and in order...");
		break;
	case 2:
		qm.dispose();
}
}