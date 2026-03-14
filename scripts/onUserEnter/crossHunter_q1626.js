/*
	名字:	隱藏地圖
	地圖:	研究所C-4區
	描述:	931050417
*/

function start() {
	if (ms.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(1627)).getStatus() > 1) {
		ms.getPlayer().getMap().spawnNpc(9073018, new java.awt.Point(-300, 167));
		ms.dispose();
		return;
		}
		ms.getEventManager("q1627").startInstance(ms.getPlayer());
		ms.dispose();
}