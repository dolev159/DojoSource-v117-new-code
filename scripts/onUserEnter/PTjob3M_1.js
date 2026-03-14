/*
	名字:	隱密之地
	地圖:	納希沙漠寶物倉庫入口
	描述:	915010100
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
		if (ms.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(25113)).getStatus() > 0) {
			ms.dispose();
			return;
			}
			ms.getPlayer().getMap().spawnNpc(1403004, new java.awt.Point(286, 182));
			ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.IntroEnableUI(1));
			ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(3, 2));
			ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(1, 1500));
			break;
	case 1:
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(3, 0));
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(1, 1000));
		break;
	case 2:
		ms.sendNextS("Trespassers? lf it isn't one thing, it's another.", 17);
		break;
	case 3:
		ms.sendNextPrevS("I suppose I won't be able to get inside my own vault if I don't fight these goons. Might as well mop them up.", 17);
		break;
	case 4:
		ms.removeNpc(ms.getPlayer().getMap().getId(), 1403004);
		for (var i = 0; i < 10; i++)
		ms.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(9001046), new java.awt.Point(286, 182));
		ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.IntroEnableUI(0));
		ms.dispose();
}
}