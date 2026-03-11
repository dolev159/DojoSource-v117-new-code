/*
	名字:	危機
	地圖:	秘密實驗室
	描述:	931040202
*/

var status = -1;

function start(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
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
		qm.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.IntroEnableUI(1));
		qm.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(1, 1000));
		break;
	case 1:
		qm.sendNextS("I'm not usually one to attack a defenseless foe, but I'm also not too dense to recognize an opportunity when I see one.", 17);
		break;
	case 2:
		qm.sendNextPrevS("Orchid will show up to protect her dear brother, won't she?", 17);
		break;
	case 3:
		qm.sendNextPrevS("I'll have to make this quick, #p1404007#...", 17);
		break;
	case 4:
		qm.getPlayer().getMap().broadcastMessage(Packages.tools.packet.CField.environmentChange("phantom/darkphantom", 3));
		qm.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(1, 6000));
		break;
	case 5:
		qm.sendNextS("Have your senses dulled so much, Phantom? lt's not like you to fall for such an easy ploy. Perhaps you've just been fooling everyone all this time?", 5, 1404005);
		break;
	case 6:
		qm.sendNextPrevS("Possession is quite taxing, and surprisingly dependent on distance.", 5, 1404005);
		break;
	case 7:
		qm.sendNextPrevS("Only the weak are truly susceptible to my powers at long range. When people come near me, however...", 5, 1404005);
		break;
	case 8:
		qm.sendNextPrevS("Even a thick-skulled 'hero' like yourself would have no chance against my possession!", 5, 1404005);
		break;
	case 9:
		qm.sendNextPrevS("I knew you would fall for this trap, Phantom.", 5, 1404005);
		break;
	case 10:
		qm.sendNextPrevS("After all, you have your sights set solely on revenge...", 5, 1404005);
		break;
	case 11:
		qm.sendNextPrevS("Shall we?", 5, 1404005);
		break;
	case 12:
		qm.dispose();
		Packages.server.quest.MapleQuest.getInstance(25440).forceComplete(qm.getPlayer(), qm.getNpc());
		qm.getPlayer().changeMap(qm.getMap(913050200), qm.getMap(913050200).getPortal(0));
}
}