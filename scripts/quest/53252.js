/*
	名字:	Baroq's Bunny Battlers
	地圖:	Black Barrier Cave
	描述:	552000074
*/

var status = -1;

function end(mode, type, selection) {
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
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(53252)).getStatus() < 1) {
			Packages.server.quest.MapleQuest.getInstance(53252).forceStart(qm.getPlayer(), qm.getNpc(), null);
			qm.dispose();
			return;
			}
			qm.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.IntroEnableUI(1));
			qm.getNPCDirectionEffect(9270090, "Effect/DirectionNewPirate.img/newPirate/balloonMsg2/9", 2000, 0, -100);
			qm.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(1, 2000));
			break;
	case 1:
		qm.sendNextS("You are lucky I need you alive for a few moments longer to unlock the #rcore's power...", 1);
		break;
	case 2:
		qm.getNPCDirectionEffect(9270090, "Effect/DirectionNewPirate.img/effect/tuto/monAttack0", 3000, 0, -100);
		qm.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(1, 3000));
		break;
	case 3:
		qm.getClient().getSession().write(Packages.tools.packet.CWvsContext.getTopMsg("Baroq sealed the Cave Entrance off with a powerful magic barrier!"));
		qm.getNPCDirectionEffect(9270092, "Effect/DirectionNewPirate.img/effect/tuto/monAttack0", 3000, 0, -100);
		qm.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(1, 3000));
		break;
	case 4:
		qm.getClient().getSession().write(Packages.tools.packet.CField.NPCPacket.setNPCSpecialAction(9270090, "teleportation"));
		qm.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(1, 1000));
		break;
	case 5:
		qm.getClient().getSession().write(Packages.tools.packet.CField.NPCPacket.removeNPCController(9270090));
		qm.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(1, 1000));
		break;
	case 6:
		qm.sendNextS("Y-you gotta go. Get out of here and let me rot...", 5, 9270092);
		break;
	case 7:
		qm.sendNextPrevS("#p9270092#, you yellow-bellied toad, get on your feet and get movin'!", 3);
		break;
	case 8:
		qm.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(1, 1000));
		break;
	case 9:
		qm.sendNextS("I... wanted your power... I wanted to be special, like you...", 5, 9270092);
		break;
	case 10:
		qm.sendNextPrevS("I couldn't see past the offer the Black Wings gave me... and they played me like a two-buck fiddle. They knew everything about the core...", 5, 9270092);
		break;
	case 11:
		qm.sendNextPrevS("They knew the only way to get you this far into space was with a big scandal. That king didn't have anything to do with anything... just a pawn in their plan. All they cared about was getting the #bcore#k to Maple World... and into their hands...", 5, 9270092);
		break;
	case 12:
		qm.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo("Effect/DirectionNewPirate.img/newPirate/balloonMsg2/11", 2000, 0, -100, 1));
		qm.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(1, 2000));
		break;
	case 13:
		qm.sendNextS("You knew I was the only one that could use the #bcore's power#k... Why'd you let me live?", 3);
		break;
	case 14:
		qm.sendNextPrevS("I hated your power, not you.", 5, 9270092);
		break;
	case 15:
		qm.sendNextPrevS("These scumbags found out you could use the #bcore#k... and they were gonna make you their slave... I tried to stop them... Don't... let lt... go to waste...", 5, 9270092);
		break;
	case 16:
		qm.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(1, 1000));
		break;
	case 17:
		qm.sendNextS("*Cough*", 5, 9270092);
		break;
	case 18:
		qm.getNPCDirectionEffect(9270092, "Effect/DirectionNewPirate.img/newPirate/balloonMsg2/25", 2000, 0, -100);
		qm.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(1, 2000));
		break;
	case 19:
		qm.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo("Effect/DirectionNewPirate.img/newPirate/balloonMsg2/18", 2000, 0, -100, 1));
		qm.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(1, 2000));
		break;
	case 20:
		qm.sendNextS("*Cough* I was hopin' to get back home once... before l kicked the bucket... I wanted to go back... to the way things used to be... when all we needed was... each other... *Cough*", 5, 9270092);
		break;
	case 21:
		qm.sendNextPrevS("I'm gonna get you out of here!", 3);
		break;
	case 22:
		qm.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(1, 1000));
		break;
	case 23:
		qm.sendNextS("I... hid the real core at #b#m240010300##k. They'll figure it out soon. You... you gotta get a move on!", 5, 9270092);
		break;
	case 24:
		qm.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(1, 1000));
		break;
	case 25:
		qm.sendNextS("#rIt ain't gonna end like this!", 5, 9270092);
		break;
	case 26:
		qm.getClient().getSession().write(Packages.tools.packet.CField.NPCPacket.setNPCSpecialAction(9270092, "alert"));
		qm.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(1, 2000));
		break;
	case 27:
		qm.sendNextS("I... won't... let them... get the #bcore#k! No matter what it takes!", 5, 9270092);
		break;
	case 28:
		qm.getClient().getSession().write(Packages.tools.packet.CField.NPCPacket.setNPCSpecialAction(9270092, "alert"));
		qm.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo("Effect/DirectionNewPirate.img/newPirate/balloonMsg2/17", 2000, 0, -100, 1));
		qm.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(1, 1000));
		break;
	case 29:
		qm.getClient().getSession().write(Packages.tools.packet.CField.environmentChange("newPirate/whiteOut", 3));
		qm.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(1, 1000));
		break;
	case 30:
		qm.getClient().getSession().write(Packages.tools.packet.CWvsContext.getTopMsg("Baroq sealed the Cave Entrance off with a powerful magic barrier!"));
		qm.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(1, 2000));
		break;
	case 31:
		qm.dispose();
		Packages.server.quest.MapleQuest.getInstance(53251).forceComplete(qm.getPlayer(), qm.getNpc());
		Packages.server.quest.MapleQuest.getInstance(53252).forceComplete(qm.getPlayer(), qm.getNpc());
		Packages.server.quest.MapleQuest.getInstance(53253).forceStart(qm.getPlayer(), qm.getNpc(), null);
		qm.getPlayer().changeMap(qm.getMap(240000000), qm.getMap(240000000).getPortal(0));
}
}