/*
	名字:	玩具城
	地圖:	圖書館倉庫
	描述:	922030200
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
		break;
	case 1:
		ms.sendNextS("Wow, this place is full of ancient old books. I wonder if they have some sort of index or... maybe I can just look for anything that says 'Black Mage' on it...", 17);
		break;
	case 2:
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(3, 2));
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(1, 2000));
		break;
	case 3:
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(3, 0));
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(1, 1000));
		break;
	case 4:
		ms.sendNextS("This book has been... burned? That's odd. lt looks very precise.", 17);
		break;
	case 5:
		ms.sendNextPrevS("Something feels off. lf anyone's out there, you'd be smart to come into the open!", 17);
		break;
	case 6:
		for (var i = 0; i < 10; i++)
		ms.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(9300504), new java.awt.Point(-200 + (Math.random() * 500), 31));
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.IntroEnableUI(0));
		ms.dispose();
}
}