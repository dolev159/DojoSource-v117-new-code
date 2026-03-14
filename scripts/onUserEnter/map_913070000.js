/*
	名字:	隱藏地圖
	地圖:	林伯特家的雜貨店
	描述:	913070000
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
		ms.getClient().getSession().write(Packages.tools.packet.CWvsContext.getTopMsg("Mr.Limbert's General Store"));
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(1, 1000));
		break;
	case 1:
		ms.getClient().getSession().write(Packages.tools.packet.CWvsContext.getTopMsg("Month 3. Day 4"));
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(1, 1000));
		break;
	case 2:
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo("Effect/Direction7.img/effect/tuto/step0/0", 2000, 0, -100, 1));
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(1, 2000));
		break;
	case 3:
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo("Effect/Direction7.img/effect/tuto/step0/1", 2000, 0, -100, 1));
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(1, 2000));
		break;
	case 4:
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo("Effect/Direction7.img/effect/tuto/step0/2", 2000, 0, -100, 1));
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(1, 3000));
		break;
	case 5:
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(3, 1));
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(1, 700));
		break;
	case 6:
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(3, 0));
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(1, 1000));
		break;
	case 7:
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo("Effect/Direction7.img/effect/tuto/step0/3", 2000, 0, -100, 1));
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(1, 2000));
		break;
	case 8:
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(3, 1));
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(1, 1500));
		break;
	case 9:
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(3, 0));
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(1, 1000));
		break;
	case 10:
		ms.sendNextS("Do you have something to say to me?", 3);
		break;
	case 11:
		ms.sendNextPrevS("What is your name?", 5, 1106000);
		break;
	case 12:
		ms.sendNextPrevS("I don't have one. Just call me #bKiddo#k. That's what the old man calls me.", 3);
		break;
	case 13:
		ms.sendNextPrevS("Is he your grandpa? Where are your parents?", 5, 1106000);
		break;
	case 14:
		ms.sendNextPrevS("I don't have any family. I just work here. \r\n#b(What's with all the questions?)#k \r\nLook, I have to get back to work before the old man comes back...", 3);
		break;
	case 15:
		ms.sendNextPrevS("Do you know the name Chromile? The Knight of Light?", 5, 1106000);
		break;
	case 16:
		ms.sendNextPrevS("Nope, never heard of the guy... \r\n#b(Why does that name sound familiar?)", 3);
		break;
	case 17:
		ms.sendNextPrevS("#eYou little brat! I told you to move boxes, not chat up my customers!", 5, 1106002);
		break;
	case 18:
		ms.sendNextPrevS("I was just about to clean it up... \r\nSorry, I gotta do what he says...", 3);
		break;
	case 19:
		ms.getPlayer().getMap().hideNpc(1106000);
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo("Effect/Direction7.img/effect/tuto/step0/4", 2000, 0, -100, 1));
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(1, 2000));
		break;
	case 20:
		ms.sendNextS("H-hey! Where did he go?! \r\nUgh, who cares?! I gotta get that stuff out of here before Limbert starts raising a ruckus again...", 3);
		break;
	case 21:
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(3, 2));
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(1, 700));
		break;
	case 22:
		ms.dispose();
		ms.gainExp(15);
		Packages.server.quest.MapleQuest.getInstance(20030).forceComplete(ms.getPlayer(), ms.getNpc());
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.IntroEnableUI(0));
		ms.getPlayer().changeMap(ms.getMap(913070001), ms.getMap(913070001).getPortal(0));
}
}