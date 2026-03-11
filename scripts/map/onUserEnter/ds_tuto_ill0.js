/*
	名字:	隱藏地圖
	地圖:	惡魔殺手LOGO
	描述:	931050310
*/

var map = 927000000;
var num = 10;

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
		ms.getClient().getSession().write(Packages.tools.packet.CField.EffectPacket.ShowWZEffect("Effect/Direction6.img/DemonTutorial/SceneLogo"));
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(1, 6300));
		break;
	case 1:
		ms.dispose();
		for (var i = 0; i < num; i++)
		if (ms.getMap(map + i).getCharacters().size() < 1 && move) {
			ms.getPlayer().changeMap(ms.getMap(map + i), ms.getMap(map + i).getPortal(0));
			move = false;
}
}
}