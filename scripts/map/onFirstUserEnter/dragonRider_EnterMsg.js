/*
	名字:	神木村
	地圖:	天空地區1
	描述:	240080100
*/

function start() {
	switch (ms.getPlayer().getMap().getId()) {
	case 240080100: //天空地區1
		ms.getPlayer().getMap().startMapEffect("Defeat all the Soaring Hawks and Soaring Eagles!", 5120026);
		break;
	case 240080200: //天空地區2
		ms.getPlayer().getMap().startMapEffect("Defeat the Wyverns and Griffey!", 5120026);
		break;
	case 240080300: //天空地區頂部
		ms.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(8300006), new java.awt.Point(468, 111));
		ms.getPlayer().getMap().startMapEffect("Defeat Dragonoir and enter the Crimson Sky Nest!", 5120026);
		break;
	case 240080500: //天空的巢穴
		ms.getPlayer().getMap().startMapEffect("Defeat the Dragon Riders that are wreaking havoc on Minar!", 5120026);
		break;
	default:
		}
		ms.dispose();
}