/*
	名字:	維多利亞
	地圖:	起點
	描述:	103050900
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
		ms.getClient().getSession().write(Packages.tools.packet.CField.EffectPacket.DublStart(false));
		ms.getClient().getSession().write(Packages.tools.packet.CField.EffectPacket.DublStart(true));
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(1, 1000));
		break;
	case 1:
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(3, 2));
		ms.getClient().getSession().write(Packages.tools.packet.CWvsContext.getTopMsg("The Secret Garden Depths"));
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(1, 1000));
		break;
	case 2:
		ms.getClient().getSession().write(Packages.tools.packet.CWvsContext.getTopMsg("On a rainy day..."));
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(1, 6000));
		break;
	case 3:
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(3, 0));
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(1, 1000));
		break;
	case 4:
		ms.dispose();
		ms.getClient().getSession().write(Packages.tools.packet.CField.EffectPacket.DublStart(false));
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.IntroEnableUI(0));
}
}