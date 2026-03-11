/*
	名字:	隱密之地
	地圖:	靈魂的對話
	描述:	913050201
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
		ms.sendNextS("You will not have your way.", 5, 1404015);
		break;
	case 2:
		ms.sendNextPrevS("lmpossible! Y-you're... Empress Aria?", 5, 1404005);
		break;
	case 3:
		ms.sendNextPrevS("Your treachery ends here, Lotus...", 5, 1404015);
		break;
	case 4:
		ms.sendNextPrevS("I do not have the power to destroy you entirely, but...", 5, 1404015);
		break;
	case 5:
		ms.sendNextPrevS("I can drive you out for good!", 5, 1404015);
		break;
	case 6:
		ms.dispose();
		ms.getPlayer().changeMap(ms.getMap(913050202), ms.getMap(913050202).getPortal(0));
}
}