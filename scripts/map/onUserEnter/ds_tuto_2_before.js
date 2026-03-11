/*
	名字:	隱藏地圖
	地圖:	場面轉換2
	描述:	927000081
*/

var map = 927000020;
var num = 60;

var move = true;

var status;

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	switch (mode) {
	case - 1:
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
		ms.getClient().getSession().write(Packages.tools.packet.CField.environmentChange("demonSlayer/text13", 3));
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(1, 1000));
		break;
	case 1:
		ms.getClient().getSession().write(Packages.tools.packet.CField.environmentChange("demonSlayer/text14", 3));
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(1, 4000));
		break;
	case 2:
		ms.dispose();
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.IntroEnableUI(0));
		for (var i = 0; i < num; i++)
		if (ms.getMap(map + i).getCharacters().size() < 1 && move) {
			ms.getMap(map + i).resetFully();
			ms.getPlayer().changeMap(ms.getMap(map + i), ms.getMap(map + i).getPortal(0));
			move = false;
}
}
}