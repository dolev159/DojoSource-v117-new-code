/*
	名字:	首領
	地圖:	沙漠的角落1
	描述:	926030000
*/

var map = 926030010;
var num = 10;

var move = true;

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
		cm.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.IntroEnableUI(1));
		cm.spawnNPCRequestController(2159324, 600, 260, 1);
		cm.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(3, 2));
		cm.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(1, 700));
		break;
	case 1:
		cm.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo("Effect/Direction6.img/effect/tuto/balloonMsg1/3", 2000, 0, -100, 1));
		cm.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(1, 2000));
		break;
	case 2:
		cm.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(3, 0));
		cm.sendNextS("There were...complications, but I got the half of the book.", 5, 2159324);
		break;
	case 3:
		cm.sendNextPrevS("#b(I can't really hear what he's saying.)", 3);
		break;
	case 4:
		cm.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(3, 2));
		cm.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(1, 1400));
		break;
	case 5:
		cm.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(3, 0));
		cm.sendNextS("Good job. Except for the fact that you were followed!", 1);
		break;
	case 6:
		cm.sendNextPrevS("#b(Did they see me?)", 3);
		break;
	case 7:
		cm.sendNextPrevS("Show yourself!", 1);
		break;
	case 8:
		cm.getClient().getSession().write(Packages.tools.packet.CField.NPCPacket.NPCSpecialAction(2159324, -1, 2, 100));
		cm.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(3, 2));
		cm.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(1, 300));
		break;
	case 9:
		cm.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(3, 0));
		cm.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(1, 100));
		break;
	case 10:
		cm.sendNextS("They're the 'complication'...and they're strong. Watch out!", 5, 2159324);
		break;
	case 11:
		cm.sendNextPrevS("#bI guess you were going to escape through that portal. Change of plans, then. Give me the book, before I get angry.", 3);
		break;
	case 12:
		cm.sendNextPrevS("No way! You have no idea how important this is!", 1);
		break;
	case 13:
		cm.sendNextPrevS("#bWrong answer. You're starting to upset me...", 3);
		break;
	case 14:
		cm.sendNextPrevS("No, please! If we fail to deliver this to #p2159332#, we're toast! Being a henchman is really tough some days!", 5, 2159325);
		break;
	case 15:
		cm.sendNextPrevS("#b#p2159332#? Are you working for the Black Mage? What does #p2159332# want with the Forbidden Book of Alchemy?", 3);
		break;
	case 16:
		cm.sendNextPrevS("Why would I tell you that?", 5, 2159324);
		break;
	case 17:
		cm.sendNextPrevS("#bHmm... #p2159332# always used cowardly tatics to get what he wanted. He's a coward, and so are you!", 3);
		break;
	case 18:
		cm.sendNextPrevS("Don't insult #p2159332#! He's not indecisive, like #p2159336#! Besides, this originally belonged to the great master!", 1);
		break;
	case 19:
		cm.sendNextPrevS("Yeah! And with this, we can destroy all of the Seal Stones and revive our master!", 5, 2159324);
		break;
	case 20:
		cm.sendNextPrevS("This fool is talking nonsense. \r\nYou need to go now. Attack them!", 1);
		break;
	case 21:
		cm.dispose();
		cm.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.IntroEnableUI(0));
		for (var i = 0; i < num; i++)
		if (cm.getMap(map + i).getCharacters().size() < 1 && move) {
			cm.getMap(map + i).resetFully();
			cm.getPlayer().changeMap(cm.getMap(map + i), cm.getMap(map + i).getPortal(0));
			move = false;
}
}
}