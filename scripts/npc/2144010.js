/*
	名字:	阿卡伊農
	地圖:	阿卡伊農的祭壇
	描述:	272020200
*/

function start() {
	cm.sendYesNo("I suppose I should thank you for barging in here. If you hadn't gone to the trouble of destroying my life's work, \r\n\r\n#rI would feel a slight pang of guilt at making you suffer.");
}

function action(mode, type, selection) {
	if (mode > 0) {
		cm.removeNpc(cm.getPlayer().getMap().getId(), cm.getNpc());
		cm.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(8860000), new java.awt.Point(280, -181));
		}
		cm.dispose();
}