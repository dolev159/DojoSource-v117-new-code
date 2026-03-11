/*
	名字:	Hidden Street
	地圖:	Key Keeper's Room
	描述:	552000021
*/

var status;

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	switch (mode) {
	case -1:
		ms.dispose();
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
		if (ms.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(53247)).getStatus() < 1) {
			Packages.server.quest.MapleQuest.getInstance(53247).forceStart(ms.getPlayer(), ms.getNpc(), null);
			}
			ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.IntroEnableUI(1));
			ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(3, 1));
			ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(1, 1000));
			break;
	case 1:
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(3, 0));
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(1, 1000));
		break;
	case 2:
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo("Effect/DirectionNewPirate.img/newPirate/balloonMsg1/20", 2000, 0, -100, 1));
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(1, 2000));
		break;
	case 3:
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.IntroEnableUI(0));
		ms.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(9420567), new java.awt.Point(-300, -120));
		ms.dispose();
}
}