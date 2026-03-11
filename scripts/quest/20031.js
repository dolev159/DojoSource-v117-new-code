/*
	名字:	搬移閣樓房間的東西
	地圖:	林伯特家的雜貨店
	描述:	913070001
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
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(20031)).getStatus() < 1) {
			Packages.server.quest.MapleQuest.getInstance(20031).forceStart(qm.getPlayer(), qm.getNpc(), null);
			qm.dispose();
			return;
			}
			qm.sendSimple("What took you so long?! You better not have been rooting through my things! \r\n\r\n#L0##bI wasn't, but I found this letter up there by the potion box... It's from some guy named Chromile.#l");
			break;
	case 1:
		qm.sendNext("What?! Who told you could touch that?!");
		break;
	case 2:
		qm.gainExp(35);
		qm.gainItem(4033194, -1);
		qm.gainItem(4033195, -1);
		qm.gainItem(2000016, 10);
		qm.gainItem(2000018, 10);
		Packages.server.quest.MapleQuest.getInstance(20031).forceComplete(qm.getPlayer(), qm.getNpc());
		qm.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.IntroEnableUI(1));
		qm.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(1, 1500));
		break;
	case 3:
		qm.sendNextS("Another great day with the old man...", 3);
		break;
	case 4:
		qm.sendNextPrevS("Huh? What's that?", 3);
		break;
	case 5:
		qm.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo("Effect/Direction7.img/effect/tuto/soul/0", 4000, 0, -100, 1));
		qm.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(1, 5000));
		break;
	case 6:
		qm.sendNextS("lt was like... a small shining light...", 3);
		break;
	case 7:
		qm.dispose();
		qm.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.IntroEnableUI(0));
		qm.getPlayer().changeMap(qm.getMap(913070002), qm.getMap(913070002).getPortal(0));
}
}