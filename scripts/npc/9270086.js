/*
	名字:	漢斯
	地圖:	Wrecked Airship 1
	描述:	552000030
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
		if (cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(53255)).getStatus() > 0) {
			cm.sendNext("Check that portal over yonder. That thing l saw was heading in that direction.");
			cm.dispose();
			return;
			}
			cm.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.IntroEnableUI(1));
			cm.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(1, 1000));
			break;
	case 1:
		cm.sendNextS("What are you thinking, crashing that hunk of junk on my beaches?You're helpin' me clean up.", 1);
		break;
	case 2:
		cm.sendNextPrevS("Have you seen a #bblue pendant#k around here?", 3);
		break;
	case 3:
		cm.sendNextPrevS("#v1352303# It looks like this. My dad gave it to me... and he wasn't one to hand out goodies. I gofta get it back.", 3);
		break;
	case 4:
		cm.sendNextPrevS("You come hurtling out of the sky at a thousand miles an hour, explode, and you're already askin' about fancy necklaces? I like your style.", 3);
		break;
	case 5:
		cm.sendNextPrevS("#b(The core must have saved my hide... but I don't feel its power anymore.)", 3);
		break;
	case 6:
		cm.sendNextPrevS("Have you seen a guy with clothes like mine? He was with me...", 3);
		break;
	case 7:
		cm.sendNextPrevS("I swear I saw something black and red dive out of that wreckage before I came up, but I thought it was just a trick of the eye.", 1);
		break;
	case 8:
		cm.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(1, 500));
		break;
	case 9:
		cm.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo("Effect/DirectionNewPirate.img/newPirate/balloonMsg1/15", 2000, 0, -100, 1));
		cm.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(1, 2000));
		break;
	case 10:
		cm.sendNextS("#b(That sorta sounds like #p9270084#. He must be scouting the area for enemies. Couldn't ask for a better sidekick.)", 3);
		break;
	case 11:
		cm.dispose();
		cm.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.IntroEnableUI(0));
		Packages.server.quest.MapleQuest.getInstance(53255).forceStart(cm.getPlayer(), cm.getNpc(), null);
}
}