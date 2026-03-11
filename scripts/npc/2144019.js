/*
	名字:	阿卡伊農
	地圖:	黑魔法師的房前迴廊
	描述:	272010200
*/

var status;

var mob = true;

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
		cm.sendNextS("(Arkarium is trying to get his hands on the seal. I have to hurry up and stop him!)", 17);
		break;
	case 1:
		cm.sendNextPrevS("Hey, #p2144010#! I won't let you get away with this!", 17);
		break;
	case 2:
		cm.sendNextPrevS("Oh, what an unwelcome guest you are. I was gonna finish this before Goddess Rhinne could get to that four-eyed geek... And this doesn't help, to say the least.", 5);
		break;
	case 3:
		cm.sendNextPrevS("Arkarium! What are you up to? Weren't you trying to eliminate the heroes?", 17);
		break;
	case 4:
		cm.sendNextPrevS("I was almost there... How annoying you are. You're just like #rthat fool#k who betrayed the Great One!", 5);
		break;
	case 5:
		cm.sendNextPrevS("Well, you'll be gone soon, so I guess there's no harm in telling you. It's true, I was going to eliminate the heroes who threaten the Great One, but I'm more interested in that #rtraitor#k.", 5);
		break;
	case 6:
		cm.sendNextPrevS("I tried to catch the #rDemon#k, but he wasn't anywhere in this timeline. So I decided to take the remaining power of Rhinne and go further into the past.", 5);
		break;
	case 7:
		cm.sendNextPrevS("If I eliminated the Demon, the Great One's barrier would be preserved, and it'd be easier to finish off the already exhausted heroes.", 5);
		break;
	case 8:
		cm.sendNextPrevS("Agh! No interruptions! My spell was nearly complete!", 5);
		break;
	case 9:
		if (mob) {
			cm.getClient().getSession().write(Packages.tools.packet.CField.NPCPacket.removeNPCController(2144019));
			cm.spawnNPCRequestController(2144019, 306, 71, 0);
			cm.getClient().getSession().write(Packages.tools.packet.CField.NPCPacket.setNPCSpecialAction(2144019, "teleport"));
			mob = false;
			}
			cm.sendNextPrevS("I can't believe you had the nerve to disturb my work! You will spend the rest of eternity rotting here!", 5);
			break;
	case 10:
		cm.getClient().getSession().write(Packages.tools.packet.CField.NPCPacket.removeNPCController(2144019));
		cm.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(8860001), new java.awt.Point(306, 71));
		cm.dispose();
}
}