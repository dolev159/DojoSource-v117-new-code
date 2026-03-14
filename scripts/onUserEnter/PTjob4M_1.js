/*
	名字:	隱密之地
	地圖:	神木村寶物倉庫入口
	描述:	915010200
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
		if (ms.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(25121)).getStatus() > 1) {
			ms.dispose();
			return;
			}
			ms.getPlayer().getMap().spawnNpc(1403002, new java.awt.Point(285, 182));
			ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.IntroEnableUI(1));
			ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(3, 2));
			ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(1, 1500));
			break;
	case 1:
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(3, 0));
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(1, 500));
		break;
	case 2:
		ms.sendNextS("(I spent a fortune on that #p1403002#, but it seems to have warded off any would-be poachers.)", 17);
		break;
	case 3:
		ms.sendNextPrevS("Open the door.", 17);
		break;
	case 4:
		ms.sendNextPrevS("Voice... check...", 5, 1403002);
		break;
	case 5:
		ms.sendNextPrevS("I thought you were faster. Are you getting rusty?", 17);
		break;
	case 6:
		ms.sendNextPrevS("Intruder! Intruder! Shifting to battle mode! Destroy the intruder!", 5, 1403002);
		break;
	case 7:
		ms.sendNextPrevS("W-what? Hey, what's wrong with you?! I own you!", 17);
		break;
	case 8:
		ms.sendNextPrevS("Intruder elimination in progress!", 5, 1403002);
		break;
	case 9:
		ms.sendNextPrevS("Hey! Stop it!", 17);
		break;
	case 10:
		ms.sendNextPrevS("ELIMINATE!", 5, 1403002);
		break;
	case 11:
		ms.removeNpc(ms.getPlayer().getMap().getId(), 1403002);
		ms.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(9001047), new java.awt.Point(285, 182));
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.IntroEnableUI(0));
		ms.dispose();
}
}