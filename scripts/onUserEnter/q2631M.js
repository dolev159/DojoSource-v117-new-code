/*
	名字:	隱藏地圖
	地圖:	傑斐的隱身處
	描述:	910100200
*/

function start() {
	if (ms.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(2631)).getStatus() != 1) {
		ms.dispose();
		return;
		}
		for (var i = 0; i < 10; i++)
		ms.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(9300526), new java.awt.Point(-100 + (Math.random() * 200), 182));
		ms.dispose();
}