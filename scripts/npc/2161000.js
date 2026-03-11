/*
	名字:	凡雷恩
	地圖:	見面室
	描述:	211070100
*/

function start() {
	cm.sendAcceptDecline("Are you the warriors who came to defeat me? Or are you from the Anti Black Mage Alliance? It doesn't matter who you are ... There's no need for chitchatting if we are sure about each other's purpose... Bring it on, you fools!");
}

function action(mode, type, selection) {
	if (mode > 0) {
		cm.removeNpc(cm.getPlayer().getMap().getId(), 2161000);
		cm.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(8840010), new java.awt.Point(0, -181));
		}
		cm.dispose();
}