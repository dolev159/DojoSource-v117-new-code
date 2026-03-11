/*
	名字:	隱藏地圖
	地圖:	墮落城市酒吧
	描述:	910350240
*/

function enter(pi) {
	pi.startportalScript("q2643M");
	return true;
}

var status;

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	switch (mode) {
	case -1:
		pi.dispose();
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
		pi.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.IntroEnableUI(1));
		pi.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(1, 1000));
		break;
	case 1:
		pi.sendNextS("Ah, a familiar face. How's Lady Syl doing?", 5, 1052001);
		break;
	case 2:
      		pi.sendNextPrevS("(You relay Lady Syl's message.)", 17);
		break;
	case 3:
      		pi.sendNextPrevS("I see. So she can't forgive me, but she'll fight alongside me... A wise decision. We're stronger when we band together. Syl has grown up...", 5, 1052001);
		break;
	case 4:
      		pi.sendNextPrevS("Come at me, then. Show me what you've got.", 5, 1052001);
		break;
	case 5:
		pi.dispose();
		pi.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(9300528), new java.awt.Point(-964, 142));
		pi.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.IntroEnableUI(0));
}
}