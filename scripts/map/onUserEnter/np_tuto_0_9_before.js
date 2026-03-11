/*
	名字:	Hidden Street
	地圖:	Scene Change 3
	描述:	552000062
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
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(1, 1500));
		break;
	case 1:
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo("Effect/DirectionNewPirate.img/newPirate/balloonMsg2/6", 2000, 100, 120, 1));
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(1, 2000));
		break;
	case 2:
		ms.sendNextS("(.........)", 3);
		break;
	case 3:
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo("Effect/DirectionNewPirate.img/newPirate/balloonMsg2/7", 2000, 100, 120, 1));
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(1, 2000));
		break;
	case 4:
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo("Effect/DirectionNewPirate.img/newPirate/balloonMsg2/8", 2000, 100, 120, 1));
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(1, 2000));
		break;
	case 5:
		ms.sendNextS("(Ugh... where... am I?)", 3);
		break;
	case 6:
		ms.sendNextPrevS("I don't know a spaceship from a barnacle, but anybody that can survive that kinda fall and still have a thirst for treasure is good in my book.", 5, 9270088);
		break;
	case 7:
		ms.sendNextPrevS("(Who... are these voices? #b#p9270084##k... my core...)", 3);
		break;
	case 8:
		ms.getMap().broadcastMessage(Packages.tools.packet.CField.environmentChange("newPirate/wakeup2", 3));
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(1, 9000));
		break;
	case 9:
		ms.dispose();
		ms.getPlayer().changeMap(ms.getMap(552000050), ms.getMap(552000050).getPortal(0));
}
}