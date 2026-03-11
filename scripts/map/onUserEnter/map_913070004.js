/*
	名字:	隱藏地圖
	地圖:	林伯特家的雜貨店
	描述:	913070004
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
		if (ms.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(20034)).getStatus() > 0) {
			ms.dispose();
			return;
			}
			ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.IntroEnableUI(1));
			ms.getClient().getSession().write(Packages.tools.packet.CWvsContext.getTopMsg("Mr.Limbert's General Store"));
			ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(1, 500));
			break;
	case 1:
		ms.getClient().getSession().write(Packages.tools.packet.CWvsContext.getTopMsg("Month 3. Day 11"));
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(1, 500));
		break;
	case 2:
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(3, 2));
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(1, 1000));
		break;
	case 3:
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(3, 1));
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(1, 1000));
		break;
	case 4:
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(3, 1));
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo("Effect/Direction7.img/effect/tuto/step0/5", 2000, 0, -100, 1));
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(1, 2500));
		break;
	case 5:
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(3, 2));
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(1, 500));
		break;
	case 6:
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(3, 0));
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(1, 500));
		break;
	case 7:
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo("Effect/Direction7.img/effect/tuto/step0/6", 2000, 0, -100, 1));
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(1, 2000));
		break;
	case 8:
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo("Effect/Direction7.img/effect/tuto/step0/4", 2000, 0, -100, 1));
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(1, 2000));
		break;
	case 9:
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo("Effect/Direction7.img/effect/tuto/step0/7", 2000, 0, -100, 1));
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(1, 2000));
		break;
	case 10:
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo("Effect/Direction7.img/effect/tuto/step0/8", 2000, 0, -100, 1));
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(1, 2000));
		break;
	case 11:
		ms.dispose();
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.IntroEnableUI(0));
		Packages.server.quest.MapleQuest.getInstance(20034).forceStart(ms.getPlayer(), ms.getNpc(), null);
		ms.getClient().getSession().write(Packages.tools.packet.CWvsContext.getTopMsg("Someone suspicious is in the back yard..."));
}
}