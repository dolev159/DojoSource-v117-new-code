/*
	名字:	隱藏地圖
	地圖:	過去的時間神殿1
	描述:	927000110
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
		ms.spawnNPCRequestController(2159335, 500, 44, 0);
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(1, 2000));
		break;
	case 1:
		ms.getClient().getSession().write(Packages.tools.packet.CField.NPCPacket.setNPCSpecialAction(2159335, "summon"));
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(1, 4000));
		break;
	case 2:
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo("Effect/Direction6.img/effect/job/balloonMsg2/0", 2000, 0, -100, 1));
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(1, 2500));
		break;
	case 3:
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo("Skill/3112.img/skill/31121005/effect", 1500, 0, 0, 1));
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo("Skill/3112.img/skill/31121005/effect0", 1500, 0, 0, 1));
		ms.getClient().getSession().write(Packages.tools.packet.CField.environmentChange("demonSlayer/31121005", 4));
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(0, 364));//角色效果
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(1, 2000));
		break;
	case 4:
		ms.sendNextS("#b(I remember the feeling of unleashing my Fury... But I can't hold onto it for long...)", 3);
		break;
	case 5:
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.IntroEnableUI(0));
		ms.getClient().getSession().write(Packages.tools.packet.CField.NPCPacket.removeNPCController(2159335));
		ms.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(ms.getPlayer().getGender() < 1 ? 9001041 : 9001042), new java.awt.Point(500, 44));
		ms.dispose();
}
}