/*
	名字:	隱密之地
	地圖:	納希沙漠寶物倉庫
	描述:	915010101
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
		ms.sendNextS("Reminds me of old times... that picture in the frame. I sure hated it when I was younger. I still kind of hate it.", 17);
		break;
	case 2:
		ms.sendNextPrevS("No time for swimming around in dark old thoughts. That skill book should be in this box.", 17);
		break;
	case 3:
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.IntroEnableUI(0));
		ms.dispose();
}
}