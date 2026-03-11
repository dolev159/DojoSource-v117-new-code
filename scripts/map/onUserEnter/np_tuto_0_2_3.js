/*
	名字:	Hidden Street
	地圖:	Space Station Hectare 2
	描述:	552000022
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
		ms.spawnNPCRequestController(9270083, 0, -120, 0);
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(3, 2));
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(1, 1000));
		break;
	case 1:
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(3, 0));
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(1, 1000));
		break;
	case 2:
		ms.sendNextS("You found the #bMaster Key!", 5, 9270083);
		break;
	case 3:
		ms.sendNextPrevS("The ship's all prepped! Let's turn and burn!", 5, 9270083);
		break;
	case 4:
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(1, 1000));
		break;
	case 5:
		ms.sendNextS("#b(Never thought I'd be on this side of the law. Only thing I care about now is finding the dog that did this to me...)", 17);
		break;
	case 6:
		ms.dispose();
		ms.getPlayer().changeMap(ms.getMap(552000020), ms.getMap(552000020).getPortal(0));
}
}