/*
	名字:	隱藏地圖
	地圖:	墮落城市酒吧
	描述:	910350230
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
		if (ms.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(2639)).getStatus() > 1) {
			ms.dispose();
			return;
			}
			ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.IntroEnableUI(1));
			ms.spawnNPCRequestController(1057001, -206, 1, 0);
			ms.spawnNPCRequestController(1052001, 52, 1, 0);
			ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(1, 2000));
			break;
	case 1:
		ms.sendNextS("I want the truth, Jin. Are Tristan's records true?", 5, 1057001);
		break;
	case 2:
      		ms.sendNextPrevS("Does it matter?", 5, 1052001);
		break;
	case 3:
		ms.sendNextPrevS("Don't try to confuse me. l've already talked to Jeppi in Ellinia. You didn't kill the previous Dark Lord...", 5, 1057001);
		break;
	case 4:
      		ms.sendNextPrevS("......", 5, 1052001);
		break;
	case 5:
		ms.sendNextPrevS("But why hide the truth from Lady Syl? You knew what she was planning. Why toy with her?", 5, 1057001);
		break;
	case 6:
      		ms.sendNextPrevS("What were you going to do, wait until she arrived to fight you before you told her? You're making her look like a fool. She's been wasting her energy all this time...", 5, 1057001);
		break;
	case 7:
      		ms.sendNextPrevS("I...", 5, 1052001);
		break;
	case 8:
		ms.sendNextPrevS("Well?", 5, 1057001);
		break;
	case 9:
      		ms.sendNextPrevS("Do you really think Syl would've benefited from knowing?", 5, 1052001);
		break;
	case 10:
		ms.sendNextPrevS("What do you mean?", 5, 1057001);
		break;
	case 11:
      		ms.sendNextPrevS("Her father sacrificed himself when she was taken hostage... How do you think she'll feel once she finds that out?", 5, 1052001);
		break;
	case 12:
      		ms.sendNextPrevS("......!", 5, 1057001);
		break;
	case 13:
		ms.sendNextPrevS("Syl is strong now, composed. But she wasn't at first. After she lost her father, she was overwhelmed with the pain and guilt. How could I tell her the truth and make her feel even worse?", 5, 1052001);
		break;
	case 14:
      		ms.sendNextPrevS("l thought she'd be better off not knowing.", 5, 1052001);
		break;
	case 15:
		ms.sendNextPrevS("But the truth always comes out. You had no right to keep it from her.", 5, 1057001);
		break;
	case 16:
      		ms.sendNextPrevS("I know. All I can say is that I'm sorry. I should've told her, but she was in so much pain...", 5, 1052001);
		break;
	case 17:
      		ms.sendNextPrevS("Not telling her has only made the pain worse...", 5, 1057001);
		break;
	case 18:
      		ms.sendNextPrevS("......", 5, 1052001);
		break;
	case 19:
		ms.dispose();
		Packages.server.quest.MapleQuest.getInstance(2644).forceStart(ms.getPlayer(), ms.getNpc(), 1);
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.IntroEnableUI(0));
}
}