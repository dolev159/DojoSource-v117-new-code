/*
	名字:	隱密之地
	地圖:	赫爾奧斯塔圖書館
	描述:	922030201
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
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.IntroEnableUI(1));
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(1, 1000));
		ms.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(9300505), new java.awt.Point(4, -29));
		break;
	case 1:
		ms.sendNextS("Mr.Wiz! You startled me. Someone has been in here burning your books... Do you care? You don't look like you care...", 17);
		break;
	case 2:
		ms.sendNextPrevS("Wiz! Get yourself together! You're not acting like yourself! Please, I don't want to give you a thrashing!", 17);
		break;
	case 3:
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.IntroEnableUI(0));
		ms.dispose();
}
}