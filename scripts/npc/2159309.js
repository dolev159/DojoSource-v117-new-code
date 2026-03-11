/*
	名字:	阿卡伊農
	地圖:	黑色魔法師的房前迴廊1
	描述:	927000020
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
		cm.sendNextS("Oh, look, it's #h0#. How was your trip? I hope it was worth disobeying your orders. And how was your family? Are they looking well? Heh heh heh...", 1);
		break;
	case 1:
		cm.sendNextPrevS("...I don't have time for you, #r#p2159309##k. Move, or I will MAKE you move.", 3);
		break;
	case 2:
		cm.sendNextPrevS("Tsk, tsk... Leaving without approval, disobeying orders... And that rebellious look... No, I don't think I'll allow you to see the Black Mage.", 1);
		break;
	case 3:
		cm.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo("Effect/Direction6.img/effect/tuto/balloonMsg1/14", 2000, 0, -100, 1));
		cm.getClient().getSession().write(Packages.tools.packet.CField.environmentChange("demonSlayer/31111003", 4));
		cm.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(0, 373));//角色攻擊
		cm.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo("Skill/3111.img/skill/31111003/effect", 0, 100, 0, 1));
		cm.getClient().getSession().write(Packages.tools.packet.CField.NPCPacket.setNPCSpecialAction(2159309, "teleportation"));
		cm.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(1, 570));
		break;
	case 4:
		cm.getClient().getSession().write(Packages.tools.packet.CField.NPCPacket.removeNPCController(2159309));
		cm.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(1, 1200));
		break;
	case 5:
		cm.spawnNPCRequestController(2159309, 180, 50, 1);//設置角色方向
		cm.getClient().getSession().write(Packages.tools.packet.CField.NPCPacket.setNPCSpecialAction(2159309, "summon"));
		cm.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(1, 360));
		break;
	case 6:
		cm.sendNextS("Really? This is treason, you know! Are you really so weak that losing your family drives you to this? Pathetic!", 1);
		break;
	case 7:
		cm.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo("Effect/Direction6.img/effect/tuto/balloonMsg1/15", 2000, 0, -100, 1));
		cm.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(3, 1));
		cm.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(1, 300));
		break;
	case 8:
		cm.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(3, 0));
		cm.getClient().getSession().write(Packages.tools.packet.CField.environmentChange("demonSlayer/31121001", 4));
		cm.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(0, 370));//角色攻擊
		cm.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo("Skill/3112.img/skill/31121001/effect", 0, 100, 0, 50));
		cm.getClient().getSession().write(Packages.tools.packet.CField.NPCPacket.setNPCSpecialAction(2159309, "summon"));
		cm.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(1, 1000));
		break;
	case 9:
		cm.getClient().getSession().write(Packages.tools.packet.CField.NPCPacket.removeNPCController(2159309));
		cm.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(1, 870));
		break;
	case 10:
		cm.spawnNPCRequestController(2159309, 500, 50, 0);
		cm.sendNextS("You are a disappointment to the cause. Guards! Crush this spineless traitor!", 1);
		break;
	case 11:
		cm.getClient().getSession().write(Packages.tools.packet.CField.environmentChange("demonSlayer/summonGuard", 4));
		cm.getClient().getSession().write(Packages.tools.packet.CField.EffectPacket.ShowWZEffect("Effect/Direction6.img/DemonTutorial/Scene4"));
		cm.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.IntroEnableUI(0));
		Packages.server.quest.MapleQuest.getInstance(23205).forceStart(cm.getPlayer(), 0, null);
		Packages.server.quest.MapleQuest.getInstance(23204).forceComplete(cm.getPlayer(), 0);
		for (var i = 0; i < 3; i++)
		cm.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(9300455), new java.awt.Point(298, 71));
		cm.dispose();
}
}