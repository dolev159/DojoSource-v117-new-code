/*
	名字:	Hidden Street
	地圖:	Space Station Hectare 2
	描述:	552000020
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
		ms.spawnNPCRequestController(9270083, 2373, -120, 0);
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(3, 1));
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(1, 1000));
		break;
	case 1:
		ms.getNPCDirectionEffect(9270083, "Effect/DirectionNewPirate.img/newPirate/balloonMsg2/2", 2000, 0, -100);
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(3, 0));
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(1, 2000));
		break;
	case 2:
		ms.getNPCDirectionEffect(9270083, "Effect/DirectionNewPirate.img/newPirate/balloonMsg2/1", 2000, 0, -100);
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(1, 2000));
		break;
	case 3:
		ms.sendNextS("#p9270083#. You follow me outta here and then you disappear. They're after me, not you.", 3);
		break;
	case 4:
      		ms.sendNextPrevS("That's not the way we do things, partner. Get on that ship and light up those engines! We can come up with a real plan later!", 5, 9270083);
		break;
	case 5:
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo("Effect/DirectionNewPirate.img/newPirate/balloonMsg1/7", 2000, 0, -100, 1));
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(1, 2000));
		break;
	case 6:
		ms.getClient().getSession().write(Packages.tools.packet.CWvsContext.getTopMsg("Follow the arrows to the portal."));
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.IntroEnableUI(0));
		ms.dispose();
}
}