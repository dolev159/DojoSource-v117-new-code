/*
	名字:	Hidden Street
	地圖:	Black Barrier Cave
	描述:	552000070
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
		ms.spawnNPCRequestController(9270084, -160, 1, 0);
		ms.spawnNPCRequestController(9270090, -300, 1, 1);
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(3, 1));
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(1, 1500));
		break;
	case 1:
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(3, 0));
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(1, 1000));
		break;
	case 2:
		ms.getClient().getSession().write(Packages.tools.packet.CWvsContext.getTopMsg("I was told the delivery was on schedule..."));
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(1, 1000));
		break;
	case 3:
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(3, 1));
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(1, 2700));
		break;
	case 4:
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(3, 0));
		ms.getClient().getSession().write(Packages.tools.packet.CWvsContext.getTopMsg("Heh heh heh... you took care of it, did you not?"));
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(1, 2000));
		break;
	case 5:
		ms.sendNextS("Ah... finally.", 5, 9270090);
		break;
	case 6:
		ms.getNPCDirectionEffect(9270090, "Effect/DirectionNewPirate.img/newPirate/balloonMsg2/12", 2000, 0, -100);
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(1, 2000));
		break;
	case 7:
		ms.getClient().getSession().write(Packages.tools.packet.CField.NPCPacket.removeNPCController(9270084));
		ms.spawnNPCRequestController(9270084, -160, 1, 1);
		ms.getNPCDirectionEffect(9270084, "Effect/DirectionNewPirate.img/newPirate/balloonMsg2/9", 2000, 0, -100);
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo("Effect/DirectionNewPirate.img/newPirate/balloonMsg2/9", 2000, 0, -100, 1));
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(1, 2500));
		break;
	case 8:
		ms.sendNextS("#r#p9270084##k?! What are you... ", 3);
		break;
	case 9:
		ms.sendNextS("#p9270084#, you didn't tell me you were on a first name basis with the Broker. I prefer to keep my identity deeper in the dark, but whatever works for you!", 5, 9270090);
		break;
	case 10:
		ms.sendNextS("We... just talked a bit about the job. Where is the device, #p2111007#? Turn it over.", 5, 9270084);
		break;
	case 11:
		ms.sendNextPrevS("(#bI didn't expect #p9270084##k to be the client... Certainly not hanging out with some big-talking thug. This must be related to the core... but why's he calling me #p2111007#?)", 3);
		break;
	case 12:
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(1, 1000));
		break;
	case 13:
		ms.getNPCDirectionEffect(9270090, "Effect/DirectionNewPirate.img/newPirate/balloonMsg2/19", 2000, 0, -100);
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(1, 2000));
		break;
	case 14:
		ms.sendNextS("I don't think I wanna hand this over to you goons. You don't look respectable...", 3);
		break;
	case 15:
		ms.sendNextPrevS("Access to a power beyond imagining AND l don't have to pay for it? Today must be my birthday. Prepare yourself for the afterlife, #p2111007#!", 5, 9270090);
		break;
	case 16:
		ms.getClient().getSession().write(Packages.tools.packet.CField.NPCPacket.removeNPCController(9270084));
		ms.spawnNPCRequestController(9270084, -160, 1, 0);
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(1, 2000));
		break;
	case 17:
		ms.sendNextS("Wait! D-Don't dirty your hands on this lowlife. I'll take care of it... sir.", 5, 9270084);
		break;
	case 18:
		ms.sendNextS("You have a lot of go-getter in you, don't you? You will do well in our organization. Go on then, destroy the weakling. And be quick, I tire of these drab surroundings.", 5, 9270090);
		break;
	case 19:
		ms.sendNextS("You're just some goon's sidekick now? We used to take down guys like that before--", 3);
		break;
	case 20:
		ms.getClient().getSession().write(Packages.tools.packet.CField.NPCPacket.removeNPCController(9270084));
		ms.spawnNPCRequestController(9270084, -160, 1, 1);
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo("Effect/DirectionNewPirate.img/newPirate/balloonMsg2/20", 2000, 0, -100, 1));
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(1, 1500));
		break;
	case 21:
		ms.getNPCDirectionEffect(9270084, "Effect/DirectionNewPirate.img/newPirate/balloonMsg2/13", 2000, 0, -100);
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(1, 2000));
		break;
	case 22:
		ms.getClient().getSession().write(Packages.tools.packet.CField.NPCPacket.setNPCSpecialAction(9270084, "alert"));
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(1, 2000));
		break;
	case 23:
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(3, 2));
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo("Effect/DirectionNewPirate.img/effect/tuto/pirateAttack", 1000, 0, -50, 1));
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(1, 200));
		break;
	case 24:
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(3, 6));
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(1, 1000));
		break;
	case 25:
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(3, 2));
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo("Effect/DirectionNewPirate.img/effect/tuto/pirateAttack", 1000, 0, -50, 1));
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(1, 200));
		break;
	case 26:
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(3, 4));
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(1, 1000));
		break;
	case 27:
		ms.getClient().getSession().write(Packages.tools.packet.CField.EffectPacket.ShowWZEffect("Effect/Direction4.img/cannonshooter/face02"));
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(1, 1000));
		break;
	case 28:
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo("Effect/DirectionNewPirate.img/newPirate/balloonMsg2/21", 2000, 0, -100, 1));
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(1, 2000));
		break;
	case 29:
		ms.sendNextS("You... always were... a wimp.", 3);
		break;
	case 30:
		ms.getClient().getSession().write(Packages.tools.packet.CField.EffectPacket.ShowWZEffect("Effect/Direction4.img/cannonshooter/face05"));
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(1, 2000));
		break;
	case 31:
		ms.getClient().getSession().write(Packages.tools.packet.CField.NPCPacket.removeNPCController(9270084));
		ms.getClient().getSession().write(Packages.tools.packet.CField.NPCPacket.removeNPCController(9270090));
		ms.getClient().getSession().write(Packages.tools.packet.CField.environmentChange("newPirate/whiteOut", 3));
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(1, 5000));
		break;
	case 32:
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo("Effect/DirectionNewPirate.img/newPirate/balloonMsg2/21", 2000, 0, -100, 1));
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(1, 2000));
		break;
	case 33:
		ms.sendNextS("They're gone...", 3);
		break;
	case 34:
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(3, 0));
		ms.sendNextPrevS("Why didn't you kill me, #b#p9270084##k? Why are you doing all of this?! I'm gonna track you to the ends of this galaxy!)", 3);
		break;
	case 35:
		ms.sendNextPrevS("#b(It's a good thing l tossed the Matter Disassembler... #p2111007#'s gonna be mad, but I've gotta go see him.)", 3);
		break;
	case 36:
		ms.dispose();
		ms.gainItem(4033250, -1);
		Packages.server.quest.MapleQuest.getInstance(53248).forceStart(ms.getPlayer(), ms.getNpc(), 1);
		ms.getPlayer().changeMap(ms.getMap(260020620), ms.getMap(260020620).getPortal(0));
}
}