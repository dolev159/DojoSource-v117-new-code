/*
	名字:	Hidden Street
	地圖:	Wrecked Airship 2
	描述:	552000040
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
		ms.spawnNPCRequestController(9270084, 127, -110, 0);
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(3, 2));
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(1, 1000));
		break;
	case 1:
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(3, 0));
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(1, 300));
		break;
	case 2:
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(3, 2));
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo("Effect/DirectionNewPirate.img/newPirate/balloonMsg1/16", 2000, 0, -100, 1));
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(1, 2000));
		break;
	case 3:
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(3, 0));
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(1, 500));
		break;
	case 4:
		ms.sendNextS("#b#p9270084##k! What's with the outfit?", 3);
		break;
	case 5:
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(3, 2));
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(1, 700));
		break;
	case 6:
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(3, 0));
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo("Effect/DirectionNewPirate.img/newPirate/balloonMsg1/17", 2000, 0, -100, 1));
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(1, 2000));
		break;
	case 7:
		ms.getNPCDirectionEffect(9270084, "Effect/DirectionNewPirate.img/newPirate/balloonMsg2/9", 2000, 0, -100);
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo("Effect/DirectionNewPirate.img/newPirate/balloonMsg2/9", 2000, 0, -100, 1));
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(1, 2000));
		break;
	case 8:
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo("Effect/DirectionNewPirate.img/newPirate/balloonMsg1/18", 2000, 0, -100, 1));
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(1, 2000));
		break;
	case 9:
		ms.sendNextS("S-seriously, #p9270084#, what's with the creepy get-up? Are you--THE CORE!", 3);
		break;
	case 10:
		ms.sendNextPrevS("I knew you were the best sidekick ever! Toss me the core and I'll get us off of this backwater planet!", 3);
		break;
	case 11:
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(1, 1000));
		break;
	case 12:
		ms.getNPCDirectionEffect(9270084, "Effect/DirectionNewPirate.img/newPirate/balloonMsg2/11", 2000, 0, -100);
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(1, 2000));
		break;
	case 13:
		ms.getNPCDirectionEffect(9270084, "Effect/DirectionNewPirate.img/newPirate/balloonMsg2/3", 2000, 0, -100);
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(1, 2000));
		break;
	case 14:
		ms.sendNextS("Do you feel poweriess without it? Do you feel like you can't really make a difference in the world?", 5, 9270084);
		break;
	case 15:
		ms.getClient().getSession().write(Packages.tools.packet.CField.NPCPacket.setNPCSpecialAction(9270084, "alert"));
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(1, 2000));
		break;
	case 16:
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(3, 1));
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo("Effect/DirectionNewPirate.img/effect/tuto/pirateAttack", 1000, 0, -50, 1));
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(1, 1000));
		break;
	case 17:
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(3, 2));
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(1, 500));
		break;
	case 18:
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(3, 4));
		ms.getClient().getSession().write(Packages.tools.packet.CField.EffectPacket.ShowWZEffect("Effect/Direction4.img/cannonshooter/face02"));
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo("Effect/DirectionNewPirate.img/effect/tuto/pirateAttack", 1000, 0, -50, 1));
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(1, 2000));
		break;
	case 19:
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(1, 1000));
		break;
	case 20:
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo("Effect/DirectionNewPirate.img/newPirate/balloonMsg2/21", 2000, 0, -100, 1));
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(1, 2000));
		break;
	case 21:
		ms.getNPCDirectionEffect(9270084, "Effect/DirectionNewPirate.img/newPirate/balloonMsg2/4", 2000, 0, -100);
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(1, 2000));
		break;
	case 22:
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo("Effect/DirectionNewPirate.img/newPirate/balloonMsg1/19", 2000, 0, -100, 1));
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(1, 2000));
		break;
	case 23:
		ms.sendNextS("Wh-what do you think you're doing?! Stop jokin' around and give me that core before I start rethinking our friendship!", 3);
		break;
	case 24:
		ms.getNPCDirectionEffect(9270084, "Effect/DirectionNewPirate.img/newPirate/balloonMsg2/5", 2000, 0, -100);
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(1, 2000));
		break;
	case 25:
		ms.sendNextS("You really thought of me as a friend? All my life, I walked in your shadow. No matter how much I trained, I couldn't surpass the power of your core.", 5, 9270084);
		break;
	case 26:
		ms.sendNextPrevS("Letting you live the life I've had to lead is my last gift fo you, friend.", 3);
		break;
	case 27:
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(1, 1000));
		break;
	case 28:
		ms.sendNextS("Nobody outside my family can use the core. You know that! It ain't gonna be anything but a useless rock to you!", 3);
		break;
	case 29:
		ms.sendNextPrevS("Then it'll be a useless rock to the both of us and we'll finally be equals... the way it was meant to be. Now , farewell...", 5, 9270084);
		break;
	case 30:
		ms.sendNextPrevS("Wait! Just, just tell me you didn't assassinate the king. Tell me you didn't do it, #p9270084#...", 3);
		break;
	case 31:
		ms.sendNextPrevS("We've all got secrets, and that's one I'm not ready to give up just yet.", 5, 9270084);
		break;
	case 32:
		ms.getClient().getSession().write(Packages.tools.packet.CField.EffectPacket.ShowWZEffect("Effect/Direction4.img/cannonshooter/face05"));
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(1, 3000));
		break;
	case 33:
		ms.sendNextS("#b#p9270084##k... it... it didn't have to be like this... ugh...", 3);
		break;
	case 34:
		ms.dispose();
		ms.getPlayer().changeSingleSkillLevel(Packages.client.SkillFactory.getSkill(5081010), -1, 0, -1);
		ms.getPlayer().changeSingleSkillLevel(Packages.client.SkillFactory.getSkill(5081011), -1, 0, -1);
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.IntroEnableUI(0));
		ms.getPlayer().changeMap(ms.getMap(552000062), ms.getMap(552000062).getPortal(0));
}
}