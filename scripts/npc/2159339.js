/*
	名字:	殺人鯨
	地圖:	回憶中的休息處3
	描述:	927000200
*/

var status;

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	switch (mode) {
	case -1:
		cm.dispose();
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
		cm.spawnNPCRequestController(2159337, 391, 176, 0);
		cm.spawnNPCRequestController(2159323, 191, 176, 1);
		cm.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.IntroEnableUI(1));
		cm.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(3, 2));
		cm.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(1, 1500));
		break;
	case 1:
		cm.getNPCDirectionEffect(2159323, "Effect/Direction6.img/effect/tuto/balloonMsg1/3", 1000, 0, -150);
		cm.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(3, 0));
		cm.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(1, 1000));
		break;
	case 2:
		cm.getClient().getSession().write(Packages.tools.packet.CField.NPCPacket.removeNPCController(2159323));
		cm.spawnNPCRequestController(2159323, 191, 176, 0);
		cm.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(1, 1000));
		break;
	case 3:
		cm.sendNextS("Yes, yes... you're so quiet.", 1);
		break;
	case 4:
		cm.sendNextPrevS("What! You're the great traitor.", 1);
		break;
	case 5:
		cm.sendNextPrevS("Hmph. Is there any reason why I shouldn't come here? I just dropped by because I remembered the old days.", 1);
		break;
	case 6:
		cm.sendNextPrevS("What...! You must be up to something!", 3);
		break;
	case 7:
		cm.sendNextPrevS("Oh, I'm so fed up. You don't listen to what people say. I'm sure you wouldn't listen even if I told you. But is it really okay for our reunion after such a long time to be like this? We... used to be good friends, weren't we...?", 1);
		break;
	case 8:
		cm.sendNextPrevS("Orca wants NAME to return as commander again.", 1);
		break;
	case 9:
		cm.sendNextPrevS("What! Orca has told you so much and you still don't listen? NAME's a bad guy!", 1);
		break;
	case 10:
		cm.sendNextPrevS("Hmph! Don't die until then. And the next time we meet, call me by my name like we used to! Bye.", 1);
		break;
	case 11:
		cm.getClient().getSession().write(Packages.tools.packet.CField.NPCPacket.setNPCSpecialAction(2159323, "teleportation"));
		cm.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(1, 1000));
		break;
	case 12:
		cm.getClient().getSession().write(Packages.tools.packet.CField.NPCPacket.removeNPCController(2159337));
		cm.getClient().getSession().write(Packages.tools.packet.CField.NPCPacket.removeNPCController(2159323));
		cm.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.IntroEnableUI(0));
		var tick = 0;
		schedule = Packages.server.Timer.EtcTimer.getInstance().register(function () {
		if (tick == 1) {
			cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(23273)).setCustomData(1);
			cm.getPlayer().updateQuest(cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(23273)), true);
			schedule.cancel(true);
			cm.dispose();
			return;
			}
			tick++;
		}, 2000);
}
}