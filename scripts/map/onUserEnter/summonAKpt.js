/*
	名字:	隱密之地
	地圖:	亞凱斯特的研究室
	描述:	920030100
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
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(1, 1000));
		break;
	case 1:
		ms.sendNextS("Holy moly, so much dust... *Cough* I don't want to think about how many airborne plagues I just inhaled. That book better be here...", 17);
		break;
	case 2:
		ms.sendNextPrevS("My Phantom sense is tingling... who's there?!", 17);
		break;
	case 3:
		for (var i = 0; i < 10; i++)
		ms.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(9300504), new java.awt.Point(-50 + (Math.random() * 300), 91));
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.IntroEnableUI(0));
		ms.dispose();
}
}