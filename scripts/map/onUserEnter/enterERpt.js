/*
	名字:	隱密之地
	地圖:	耶雷弗散步步道
	描述:	913050200
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
		ms.sendNextS("(This is... Ereve?)", 17);
		break;
	case 2:
		ms.sendNextPrevS("You know this place very well to, do you not?", 5, 1404005);
		break;
	case 3:
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(3, 2));
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(1, 5000));
		break;
	case 4:
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(3, 0));
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(1, 1000));
		break;
	case 5:
		ms.sendNextS("(C-Cygnus?! Lotus, don't you dare...!)", 17);
		break;
	case 6:
		ms.sendNextPrevS("The hero from days gone by goes mad and assassinates the empress. Every peon in Maple World will have your name on their angry lips.", 5, 1404005);
		break;
	case 7:
		ms.sendNextPrevS("(N-no...!)", 17);
		break;
	case 8:
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(1, 1000));
		break;
	case 9:
		ms.sendNextS("Phantom?! You came! Athena Pierce has told me much of your heroics. I had hoped to thank you for your help before, but you disappeared. I am humbled to be in your presence.", 5, 1404008);
		break;
	case 10:
		ms.sendNextPrevS("(Don't get any closer! lt's dangerous! )", 17);
		break;
	case 11:
		ms.sendNextPrevS("Umm... you don't look so well. Are you well? I-I'm sorry to ask, it's just that... well I was very happy to see you. Please, take a rest nearby. I can have some drinks brought in...", 5, 1404008);
		break;
	case 12:
		ms.sendNextPrevS("(Get away, #p1404008#! #p1404007# is trying to kill you! What do I do?! I can't stop myself... I can't move... Someone help!)", 17);
		break;
	case 13:
		ms.dispose();
		ms.getPlayer().changeMap(ms.getMap(913050201), ms.getMap(913050201).getPortal(0));
}
}