/*
	名字:	Hidden Street
	地圖:	Black Barrier Cave
	描述:	552000074
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
		ms.spawnNPCRequestController(9270092, 400, 10, 0);
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(3, 2));
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(1, 1500));
		break;
	case 1:
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(3, 0));
		ms.getNPCDirectionEffect(9270092, "Effect/DirectionNewPirate.img/newPirate/balloonMsg2/14", 2000, 0, -100);
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(1, 2000));
		break;
	case 2:
		ms.spawnNPCRequestController(9270090, 730, 10, 0);
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo("Effect/DirectionNewPirate.img/newPirate/balloonMsg2/9", 2000, 0, -100, 1));
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(1, 2000));
		break;
	case 3:
		ms.sendNextS("Ha! Just as I suspected... a great plan come to ruin because of one idiot's weak-hearted sympathy.", 5, 9270090);
		break;
	case 4:
		ms.sendNextPrevS("Ugh... How could I fall for such a simple trap?", 5, 9270092);
		break;
	case 5:
		ms.sendNextPrevS("Simple traps are always the best, my red-headed friend! You stood no chance against my machinations. I told you that I knew where the Bounty Hunter was, and you brought the Bounty Hunter right to me.", 5, 9270090);
		break;
	case 6:
		ms.sendNextPrevS("It was devilishly easy. In the end, your childish sympathy has given me everything I wanted!", 5, 9270092);
		break;
	case 7:
		ms.sendNextPrevS("I've had the pleasure of playing a complex symphony with your emotions. Now I will give you the grand finale. I will show you how I deal with traitors.", 5, 9270092);
		break;
	case 8:
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(1, 1000));
		break;
	case 9:
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo("Effect/DirectionNewPirate.img/newPirate/balloonMsg2/18", 2000, 0, -100, 1));
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(1, 2000));
		break;
	case 10:
		ms.sendNextS("What's he talking about #p9270092#?", 3);
		break;
	case 11:
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(1, 1000));
		break;
	case 12:
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo("Effect/DirectionNewPirate.img/newPirate/balloonMsg2/9", 2000, 0, -100, 1));
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(1, 2000));
		break;
	case 13:
		ms.getNPCDirectionEffect(9270090, "Effect/DirectionNewPirate.img/newPirate/balloonMsg2/15", 2000, 0, -100);
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(1, 1000));
		break;
	case 14:
		ms.sendNextS("The power of the #bcore#k was... wilder than I expected. It took me some time to tame its more ferocious tendencies.", 5, 9270090);
		break;
	case 15:
		ms.sendNextPrevS("Though it could not be fully controlled without the #bcore's owner#k, could it? I would have had you long ago if it weren't for this one's misdirection.", 5, 9270090);
		break;
	case 16:
		ms.getNPCDirectionEffect(9270090, "Effect/DirectionNewPirate.img/newPirate/balloonMsg2/16", 2000, 0, -100);
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(1, 2000));
		break;
	case 17:
		ms.dispose();
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.IntroEnableUI(0));
		Packages.server.quest.MapleQuest.getInstance(53252).forceStart(ms.getPlayer(), ms.getNpc(), null);
		ms.getClient().getSession().write(Packages.tools.packet.CWvsContext.getTopMsg("Eliminate all Black Wing Henchmen."));
		ms.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(9420570), new java.awt.Point(500, 10));
		ms.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(9420570), new java.awt.Point(530, 10));
		ms.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(9420570), new java.awt.Point(560, 10));
		ms.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(9420570), new java.awt.Point(590, 10));
		ms.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(9420570), new java.awt.Point(620, 10));
		ms.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(9420570), new java.awt.Point(650, 10));
}
}