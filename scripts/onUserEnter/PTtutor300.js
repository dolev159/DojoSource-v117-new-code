/*
	名字:	耶雷弗
	地圖:	騎士之殿
	描述:	915000300
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
		if (ms.getPlayer().getMap().getAllMonstersThreadsafe().size() < 1) {
			ms.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(9300498), new java.awt.Point(-2050, -1204));
			ms.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(9300507), new java.awt.Point(-2420, -964));
			ms.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(9300498), new java.awt.Point(-2070, -717));
			ms.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(9300507), new java.awt.Point(-2070, -476));
			ms.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(9300498), new java.awt.Point(-2430, -210));
			}
			ms.getClient().getSession().write(Packages.tools.packet.CField.NPCPacket.getEvanTutorial("UI/tutorial/phantom/0/0"));
			break;
	case 1:
		ms.getClient().getSession().write(Packages.tools.packet.CField.NPCPacket.getEvanTutorial("UI/tutorial/phantom/1/0"));
		break;
	case 2:
		ms.getClient().getSession().write(Packages.tools.packet.CField.NPCPacket.getEvanTutorial("UI/tutorial/phantom/2/0"));
		break;
	case 3:
		ms.getClient().getSession().write(Packages.tools.packet.CField.NPCPacket.getEvanTutorial("UI/tutorial/phantom/3/0"));
		break;
	case 4:
		ms.getClient().getSession().write(Packages.tools.packet.CField.NPCPacket.getEvanTutorial("UI/tutorial/phantom/4/0"));
		break;
	case 5:
		ms.dispose();
}
}