/*
	名字:	隱密之地
	地圖:	隱藏玩偶師的洞穴
	描述:	910600103
*/

function start() {
	if (ms.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(25419)).getStatus() > 1 || (ms.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(25419)).getStatus() == 1 && ms.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(25419)).getMobKills(9300500) > 0)) {
		ms.getPlayer().getMap().spawnNpc(1404000, new java.awt.Point(187, 246));
		ms.getEventManager("q25419").startInstance(ms.getPlayer());
		ms.dispose();
		return;
		}
		ms.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(9300500), new java.awt.Point(187, 246));
		ms.getEventManager("q25419").startInstance(ms.getPlayer());
		ms.dispose();
}