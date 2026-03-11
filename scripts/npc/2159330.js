/*
	名字:	發亮的墜飾
	地圖:	惡魔的老家
	描述:	924020000
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
		status--;
		break;
	case 1:
		status++;
		break;
		}
	switch (status) {
	case 0:
		if (cm.getPlayer().getPosition().x < 272 || cm.getPlayer().getPosition().x > 472) {
			cm.getClient().getSession().write(Packages.tools.packet.CWvsContext.serverNotice(5, "It's too far away to see clearly. I must get closer."));
			cm.dispose();
			return;
			}
			cm.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.IntroEnableUI(1));
			Packages.server.quest.MapleQuest.getInstance(23202).forceComplete(cm.getPlayer(), cm.getNpc());
			cm.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo("Effect/Direction6.img/effect/tuto/balloonMsg1/4", 1000, 0, -100, 1));
			cm.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(1, 1500));
			break;
	case 1:
		cm.sendNextS("#bThis is...", 3);
		break;
	case 2:
		cm.getPlayer().getMap().broadcastMessage(Packages.tools.packet.CField.environmentChange("demonSlayer/pendant", 3));
		cm.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(1, 4200));
		break;
	case 3:
		cm.sendNextS("#bMother... Damien...", 3);
		break;
	case 4:
		cm.sendNextPrevS("#b...", 3);
		break;
	case 5:
		cm.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo("Effect/Direction6.img/effect/tuto/balloonMsg1/5", 2000, 0, -100, 1));
		cm.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(1, 2000));
		break;
	case 6:
		cm.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo("Effect/Direction6.img/effect/tuto/balloonMsg1/6", 2000, 0, -150, 1));
		cm.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(1, 2000));
		break;
	case 7:
		cm.dispose();
		cm.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.IntroEnableUI(0));
		cm.getPlayer().changeMap(cm.getMap(927000081), cm.getMap(927000081).getPortal(0));
}
}